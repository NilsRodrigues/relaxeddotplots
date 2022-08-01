class VoronoiGL{
    
    private gl: WebGL2RenderingContext;
    private ext_cbf: any;
    private voronoiImage: any;

    private seedingShader: WebGLProgram;
    private voronoiShader: WebGLProgram;
    private visualizeShader: WebGLProgram;
    private momentumShader: WebGLProgram;
    private condenseShader: WebGLProgram;
    private collectShader: WebGLProgram;
    private overlapShader: WebGLProgram;

    private kdeTexture: WebGLTexture;
    private kdeTexWidth: number;
    private jumpFloodSteps: number;
    private jumpFloodTextures: WebGLTexture[];
    private voronoiTextures: WebGLTexture[];
    private voronoiFrameBuffers: WebGLFramebuffer[];
    private voronoiIndex: number;
    private momentumTextures: WebGLTexture[];
    private momentumFrameBuffers: WebGLFramebuffer[];
    private momentumIndex: number;
    private pointData: Float32Array;
    private pointDataTexture: WebGLTexture;
    private pointDataNewTexture: WebGLTexture;
    private pointDataNewFramebuffer: WebGLFramebuffer;
    private pointDataFramebufferWidth: number = 0;
    private pointColors: Uint8Array;
    private pointColorsTexture: WebGLTexture;
    private pointTexWidth: number = 0;

    private readBuffer: WebGLBuffer;
    private rawPixelMapData: Int32Array;
    private pixelMap: PixelMap;
    private rawPointData: Float32Array;

    private pointCount: number = 0;
    private canvas: any;
    private ratioX: number;
    private ratioY: number;
    
    private visible: boolean = false;

    private dataURL: string;

    private rng: RNG;

    constructor(inputConfig:InputConfig, container: any){
        this.canvas = document.createElement("canvas");

        this.canvas.id = "webgl-canvas-" + inputConfig.containerId;
        this.canvas.width = 0;
        this.canvas.height = 0;

        // start voronoi hidden
        this.voronoiImage = container.append("svg:image").style("opacity", "0");

        // Next, to make it easy to make changes, we remove any older
        // versions of the canvas when hitting "Run" - now you can
        // make changes and see them reflected when you press "Run"
        // or (cmd + enter):

        const existingCanvas = document.getElementById(this.canvas.id);
        if (existingCanvas && existingCanvas.parentElement) {
            existingCanvas.parentElement.removeChild(existingCanvas);
        }

        // Tell the canvas element that we will use WebGL to draw
        // inside the element (and not the default raster engine):

        this.gl = this.canvas.getContext("webgl2", {antialias: false});

        this.gl.disable(this.gl.BLEND);
        this.gl.disable(this.gl.SAMPLE_COVERAGE);
        this.gl.disable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
        this.gl.disable(this.gl.DITHER);
        this.gl.disable(this.gl.DEPTH_TEST);

        this.compileShaders();

        // Add the new canvas element into the bottom left
        // of the playground
        document.body.appendChild(this.canvas);
        this.canvas.style.visibility = "hidden";
        this.canvas.style.display = "none";

        this.ext_cbf = this.gl.getExtension("EXT_color_buffer_float");
        if (!this.ext_cbf) {
            console.log("need EXT_color_buffer_float");
        }

        this.rng = mulberry32(inputConfig.randomSeed);
    }

    /**
     * Small helper function to compile a shader and automatically print the info log
    */
    private compileShaderWithInfo(shader: WebGLShader, name: string){
        this.gl.compileShader(shader);
        const infoLog = this.gl.getShaderInfoLog(shader)
        if(infoLog.length > 0){
            console.log("Shader Compile log of \"" + name + "\":");
            console.log(infoLog);
        }
    }

    /**
     * Compiles all shaders and creates the necessary programs
    */
    private compileShaders(){
        const seedingVS = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(
            seedingVS,
            `#version 300 es
            precision highp float;

            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;
            uniform vec2 u_res;

            flat out int v_id;

            void main() {
                ivec2 pointSample = ivec2(gl_VertexID%u_pointTexWidth, gl_VertexID/u_pointTexWidth);
                vec2 pointPos = floor(texelFetch(u_pointDataTex, pointSample, 0).xy) + vec2(0.5, 0.5);
                gl_Position = vec4((pointPos/u_res)*2.0 - 1.0, 0.0, 1.0);
                gl_PointSize = 1.0;
                v_id = gl_VertexID;
            }
            `
        )
        this.compileShaderWithInfo(seedingVS, "seedingVS");

        const seedingFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            seedingFS,
            `#version 300 es
            precision highp float;

            flat in int v_id;
            out ivec2 o_color;

            void main() {
                o_color = ivec2(v_id, 0);
            }
            `
        );
        this.compileShaderWithInfo(seedingFS, "seedingFS");

        const fullQuadVS = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(
            fullQuadVS,
            `#version 300 es
            precision highp float;
            
            const vec2 pos[6] = vec2[](
                vec2(-1.0, -1.0),
                vec2(1.0, -1.0),
                vec2(1.0, 1.0),
                vec2(-1.0, -1.0),
                vec2(1.0, 1.0),
                vec2(-1.0, 1.0)
            );
            const vec2 tex[6] = vec2[](
                vec2(0.0, 0.0),
                vec2(1.0, 0.0),
                vec2(1.0, 1.0),
                vec2(0.0, 0.0),
                vec2(1.0, 1.0),
                vec2(0.0, 1.0)
            );

            out vec2 v_texCoords;

            void main() {
                gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
                v_texCoords = tex[gl_VertexID];
            }
            `
        )
        this.compileShaderWithInfo(fullQuadVS, "fullQuadVS");

        const voronoiFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            voronoiFS,
            `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_lastStepTex;
            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;

            uniform int u_jumpSize;
            uniform ivec2 u_res;

            layout(location = 0) out int o_voronoi;
            layout(location = 1) out int o_jumpFlood;

            // offset to all eight neighbours that need to be checked
            ivec2 directions[8] = ivec2[](ivec2(-1,-1), ivec2( 0,-1), ivec2( 1,-1),
                                          ivec2(-1, 0),               ivec2( 1, 0),
                                          ivec2(-1, 1), ivec2( 0, 1), ivec2( 1, 1));

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                ivec2 originalId = texelFetch(u_lastStepTex, pixelPos, 0).xy;
                
                int minCellIndex = originalId.x;
                float minDistance = float(u_res.x*u_res.y);
                int idSource = -1;

                // use center as a basis if a valid id is present
                if(minCellIndex >= 0){
                    ivec2 pointSample = ivec2(minCellIndex%u_pointTexWidth, minCellIndex/u_pointTexWidth);
                    vec3 centerPoint = texelFetch(u_pointDataTex, pointSample, 0).xyz;
                    minDistance = length(gl_FragCoord.xy - centerPoint.xy) - centerPoint.z;
                }

                for (int i = 0; i < 8; i++) {
                    ivec2 neighbSample = pixelPos + directions[i] * u_jumpSize;
                    // check if point to check is still within our boundary
                    if (neighbSample.x >= 0 && neighbSample.x < u_res.x && neighbSample.y >= 0 && neighbSample.y < u_res.y) {
                        ivec2 neighbId = texelFetch(u_lastStepTex, neighbSample, 0).xy;

                        if(neighbId.x < 0) continue;

                        ivec2 pointSample = ivec2(neighbId.x%u_pointTexWidth, neighbId.x/u_pointTexWidth);
                        vec3 neighbPoint = texelFetch(u_pointDataTex, pointSample, 0).xyz;
                        // calc distance from current point to neighbour (with radius of the circle)
                        float neighbDist = length(gl_FragCoord.xy - neighbPoint.xy) - neighbPoint.z;
                        
                        // save smallest distance and corresponding id
                        if (neighbDist < minDistance) {
                            minDistance = neighbDist;
                            minCellIndex = neighbId.x;
                            idSource = i;
                        }
                    }
                }
                o_voronoi = minCellIndex;
                o_jumpFlood = idSource;
            }
            `
        );
        this.compileShaderWithInfo(voronoiFS, "voronoiFS");

        const visualizeFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            visualizeFS,
            `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_voronoiTex;
            uniform sampler2D u_pointDataTex;
            uniform sampler2D u_pointColTex;
            uniform int u_pointTexWidth;
            
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;
            uniform float u_lightEdges;

            out vec4 o_color;

            void main() {
                int id_right = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(1, 0), 0).x;
                int id_down = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(0, 1), 0).x;
                int id_left = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(-1, 0), 0).x;
                int id_up = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy) + ivec2(0, -1), 0).x;
                ivec2 id_center = texelFetch(u_voronoiTex, ivec2(gl_FragCoord.xy), 0).xy;
                bool isBorder = id_center.x != id_right || id_center.x != id_down || id_center.x != id_left || id_center.x != id_up;

                ivec2 samplePos = ivec2(id_center.x%u_pointTexWidth, id_center.x/u_pointTexWidth);

                float kdeVal_center = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x)%u_kdeTexWidth, int(gl_FragCoord.x)/u_kdeTexWidth), 0).r;
                float kdeVal_left = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x-1.0)%u_kdeTexWidth, int(gl_FragCoord.x-1.0)/u_kdeTexWidth), 0).r;
                float kdeVal_right = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x+1.0)%u_kdeTexWidth, int(gl_FragCoord.x+1.0)/u_kdeTexWidth), 0).r;

                if(gl_FragCoord.y > kdeVal_center) discard;
                isBorder = isBorder || int(gl_FragCoord.y) == int(kdeVal_center) || gl_FragCoord.y > kdeVal_left || gl_FragCoord.y > kdeVal_right;

                vec4 pointData = texelFetch(u_pointDataTex, samplePos, 0);
                vec3 normalColor = texelFetch(u_pointColTex, samplePos, 0).rgb;
                vec3 lightColor = (vec3(0.5, 0.5, 0.5) + normalColor * 0.5) * u_lightEdges;
                o_color = vec4(isBorder ? lightColor : normalColor, 1.0);
            }
            `
        );
        this.compileShaderWithInfo(visualizeFS, "visualizeFS");

        const momentumFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            momentumFS,
            `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_voronoiTex;
            uniform sampler2D u_pointDataTex;
            uniform int u_pointTexWidth;
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;
            uniform float u_circlePadding;

            out vec4 o_momentum;

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                vec2 pixelCenter = vec2(pixelPos) + 0.5;

                float kdeVal = texelFetch(u_kdeTex, ivec2(pixelPos.x%u_kdeTexWidth, pixelPos.x/u_kdeTexWidth), 0).r;
                float density = (pixelCenter.y <= kdeVal) ? 1.0 : 0.0;

                int pointID = texelFetch(u_voronoiTex, pixelPos, 0).x;

                // only needed for debugging
                ivec2 pointSamplePos = ivec2(pointID%u_pointTexWidth, pointID/u_pointTexWidth);
                vec4 pointData = texelFetch(u_pointDataTex, pointSamplePos, 0);
                float inCircle = (length(pixelCenter - pointData.xy) < pointData.z*(1.0-u_circlePadding)) ? 1.0 : 0.0;

                o_momentum = vec4(density * vec3(1.0, pixelCenter.x, pixelCenter.y), inCircle);
            }
            `
        );
        this.compileShaderWithInfo(momentumFS, "momentumFS");

        const condenseFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            condenseFS,
            `#version 300 es
            precision highp float;
            precision highp int;
            precision highp isampler2D;

            in vec2 v_texCoords;

            uniform isampler2D u_jumpFloodTex;
            uniform sampler2D u_momentumTex;

            uniform int u_jumpSize;
            uniform ivec2 u_res;

            out vec4 o_momentum;

            ivec2 directions[8] = ivec2[](ivec2(-1,-1), ivec2( 0,-1), ivec2( 1,-1),
                                          ivec2(-1, 0),               ivec2( 1, 0),
                                          ivec2(-1, 1), ivec2( 0, 1), ivec2( 1, 1));

            void main() {
                ivec2 pixelPos = ivec2(gl_FragCoord.xy);
                vec4 selfMomentum = vec4(0, 0, 0, 0);
                int selfSource = texelFetch(u_jumpFloodTex, pixelPos, 0).x;

                // only carry over own momentum if there was no source this step (otherwise the source would take this data)
                if(selfSource < 0){
                    selfMomentum = texelFetch(u_momentumTex, pixelPos, 0);
                }

                // check neighbouring pixels if this pixel was their source and take their data
                for (int i = 0; i < 8; i++) {
                    ivec2 neighbSample = pixelPos + directions[i] * u_jumpSize;
                    // check if pixel is still within our boundary
                    if (neighbSample.x >= 0 && neighbSample.x < u_res.x && neighbSample.y >= 0 && neighbSample.y < u_res.y) {
                        int neighbSource = texelFetch(u_jumpFloodTex, neighbSample, 0).x;

                        if(neighbSource == (7-i)){
                            selfMomentum += texelFetch(u_momentumTex, neighbSample, 0);
                        }
                    }
                }
                o_momentum = selfMomentum;
            }
            `
        );
        this.compileShaderWithInfo(condenseFS, "condenseFS");

        const collectFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            collectFS,
            `#version 300 es
            precision highp float;
            precision highp int;

            in vec2 v_texCoords;

            uniform sampler2D u_momentumTex;
            uniform sampler2D u_pointDataTex;
            uniform float u_xCorrection;

            out vec4 o_pointData;

            void main() {
                ivec2 pointSamplePos = ivec2(gl_FragCoord.xy);
                vec4 pointData = texelFetch(u_pointDataTex, pointSamplePos, 0);
                ivec2 pixelSamplePos = ivec2(pointData.xy);
                vec4 pointMomentum = texelFetch(u_momentumTex, pixelSamplePos, 0);

                vec3 pointDataNew = pointMomentum.yzw / pointMomentum.x;
                pointDataNew.x = mix(pointDataNew.x, pointData.w, u_xCorrection);

                o_pointData = vec4(pointDataNew.xy, length(pointDataNew.xy - pointData.xy) / pointData.z, pointDataNew.z);
            }
            `
        );
        this.compileShaderWithInfo(collectFS, "collectFS");

        const overlapFS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(
            overlapFS,
            `#version 300 es
            precision highp float;
            precision highp int;
            precision highp usampler2D;

            in vec2 v_texCoords;

            uniform sampler2D u_pointDataTex;
            uniform uint u_pointTexWidth;
            uniform uint u_pointCount;
            uniform float u_dotSizeScale;
            
            uniform sampler2D u_kdeTex;
            uniform int u_kdeTexWidth;

            out vec4 o_color;

            void main() {
                int pointsFound = 0;
                for(uint i = 0u; i < u_pointCount; i++){
                    ivec2 samplePos = ivec2(i%u_pointTexWidth, i/u_pointTexWidth);
                    vec4 pointData = texelFetch(u_pointDataTex, samplePos, 0);
                    if(length(gl_FragCoord.xy - pointData.xy) <= pointData.z*u_dotSizeScale)pointsFound++;
                }
                float kdeVal = texelFetch(u_kdeTex, ivec2(int(gl_FragCoord.x)%u_kdeTexWidth, int(gl_FragCoord.x)/u_kdeTexWidth), 0).r;
                float alpha = (gl_FragCoord.y <= kdeVal) ? 1.0f : 0.0f;
                o_color = pointsFound > 1 ? vec4(1.0, 0.0, 0.0, alpha) : vec4(1.0, 1.0, 1.0, alpha);
            }
            `
        );
        this.compileShaderWithInfo(overlapFS, "overlapFS");

        this.seedingShader = this.gl.createProgram();
        this.gl.attachShader(this.seedingShader, seedingVS);
        this.gl.attachShader(this.seedingShader, seedingFS);
        this.gl.linkProgram(this.seedingShader);

        this.voronoiShader = this.gl.createProgram();
        this.gl.attachShader(this.voronoiShader, fullQuadVS);
        this.gl.attachShader(this.voronoiShader, voronoiFS);
        this.gl.linkProgram(this.voronoiShader);

        this.visualizeShader = this.gl.createProgram();
        this.gl.attachShader(this.visualizeShader, fullQuadVS);
        this.gl.attachShader(this.visualizeShader, visualizeFS);
        this.gl.linkProgram(this.visualizeShader);

        this.momentumShader = this.gl.createProgram();
        this.gl.attachShader(this.momentumShader, fullQuadVS);
        this.gl.attachShader(this.momentumShader, momentumFS);
        this.gl.linkProgram(this.momentumShader);

        this.condenseShader = this.gl.createProgram();
        this.gl.attachShader(this.condenseShader, fullQuadVS);
        this.gl.attachShader(this.condenseShader, condenseFS);
        this.gl.linkProgram(this.condenseShader);

        this.collectShader = this.gl.createProgram();
        this.gl.attachShader(this.collectShader, fullQuadVS);
        this.gl.attachShader(this.collectShader, collectFS);
        this.gl.linkProgram(this.collectShader);

        this.overlapShader = this.gl.createProgram();
        this.gl.attachShader(this.overlapShader, fullQuadVS);
        this.gl.attachShader(this.overlapShader, overlapFS);
        this.gl.linkProgram(this.overlapShader);
    }

    /**
     * Toggles the visibility of the voronoi canvas
    */
    public toggleVisibility(): boolean{
        this.visible = !this.visible;
        this.voronoiImage.style("opacity", (this.visible) ? "1" : "0");
        return this.visible;
    }

    /**
     * Applies texture settings which are used for most textures in this application to ensure proper reading of data values.
     * Parameters will be applied to the currently bound texture.
    */
     private applyDefaultTexParameters(){
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_BASE_LEVEL, 0);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAX_LEVEL, 0);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }

    /**
     * Will recreate all framebuffers dependant on canvas size and their textures.
     * Should only be called when the canvas size changes.
    */
     private updateFramebuffers(plotParam:PlotParam){
        const width = plotParam.supSampWidth;
        const height = plotParam.supSampHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.voronoiImage.attr("height", Math.ceil(plotParam.height))
            .attr("width", Math.ceil(plotParam.width));

        let ratio = 0;
        if(width > height){
            ratio = width/height;
            this.ratioX = ratio, this.ratioY = 1.0;
        }else{
            ratio = height/width;
            this.ratioX = 1.0, this.ratioY = ratio;
        }
        // twice the length of diagonal of width and height
        const scaling = Math.sqrt(Math.pow(this.ratioX, 2) + Math.pow(this.ratioY, 2)) * 2;
        this.ratioX = scaling/this.ratioX;
        this.ratioY = scaling/this.ratioY;
        this.jumpFloodSteps = Math.floor(Math.log2(Math.max(this.canvas.width, this.canvas.height))) + 2; //add two more steps with n = 0

        if(this.jumpFloodTextures === undefined)this.jumpFloodTextures = [];
        for(let i = 0; i < this.jumpFloodSteps; i++){
            if(this.jumpFloodTextures[i] === undefined) this.jumpFloodTextures[i] = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.jumpFloodTextures[i]);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R8I, width, height, 0, this.gl.RED_INTEGER, this.gl.BYTE, null);
            this.applyDefaultTexParameters();
        }
        
        if(this.voronoiTextures === undefined)this.voronoiTextures = [];
        if(this.voronoiFrameBuffers === undefined)this.voronoiFrameBuffers = [];

        if(this.voronoiTextures[0] === undefined) this.voronoiTextures[0] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[0]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32I, width, height, 0, this.gl.RED_INTEGER, this.gl.INT, null);
        this.applyDefaultTexParameters();

        if(this.voronoiFrameBuffers[0] === undefined) this.voronoiFrameBuffers[0] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[0]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.voronoiTextures[0], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);

        if(this.voronoiTextures[1] === undefined) this.voronoiTextures[1] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[1]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32I, width, height, 0, this.gl.RED_INTEGER, this.gl.INT, null);
        this.applyDefaultTexParameters();

        if(this.voronoiFrameBuffers[1] === undefined) this.voronoiFrameBuffers[1] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[1]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.voronoiTextures[1], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);
 
        if(this.momentumTextures === undefined)this.momentumTextures = [];
        if(this.momentumFrameBuffers === undefined)this.momentumFrameBuffers = [];

        if(this.momentumTextures[0] === undefined) this.momentumTextures[0] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[0]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();

        if(this.momentumFrameBuffers[0] === undefined) this.momentumFrameBuffers[0] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[0]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.momentumTextures[0], 0);

        if(this.momentumTextures[1] === undefined) this.momentumTextures[1] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[1]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();

        if(this.momentumFrameBuffers[1] === undefined) this.momentumFrameBuffers[1] = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[1]);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.momentumTextures[1], 0);

        this.gl.flush();
    }

    /**
     * Updates kde texture.
     * Should only be called when the canvas size changes.
     * Will create the texture if it is undefined.
    */
     public updateKdeTexture(inputConfig:InputConfig, kde:KDE, plotParam: PlotParam){
        this.kdeTexWidth = Math.ceil(Math.sqrt(this.canvas.width));
        const kdeData = new Float32Array(this.kdeTexWidth*this.kdeTexWidth);
        for(let i = 0; i < this.canvas.width; i++){
            // kde needs a domain value, and gives a domain value back
            let kdeVal = inputConfig.dots.dotscaling.scaleDensityDom(kde(plotParam.xAxisScale.invert((i+0.5)/inputConfig.relaxing.supSampFactor)), inputConfig.dots.dSingle);
            kdeData[i] = kdeVal * plotParam.domainToPixel * inputConfig.relaxing.supSampFactor;
        }

        if(this.kdeTexture === undefined){
            this.kdeTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
            this.applyDefaultTexParameters();
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, this.kdeTexWidth, this.kdeTexWidth, 0, this.gl.RED, this.gl.FLOAT, kdeData);
        }else{
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, this.kdeTexWidth, this.kdeTexWidth, 0, this.gl.RED, this.gl.FLOAT, kdeData);
        }
        this.gl.flush();
    }

    /**
     * Will recreate the texture and framebuffer used for the updated point data.
     * Should only be called when the number of points changes.
     * Will take it's new size from pointTexWidth.
    */
     private updatePointFramebuffer(){
        this.pointDataFramebufferWidth = this.pointTexWidth;

        if(this.pointDataNewTexture === undefined) this.pointDataNewTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataNewTexture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, this.pointDataFramebufferWidth, this.pointDataFramebufferWidth, 0, this.gl.RGBA, this.gl.FLOAT, null);
        this.applyDefaultTexParameters();

        if(this.pointDataNewFramebuffer === undefined) this.pointDataNewFramebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointDataNewFramebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.pointDataNewTexture, 0);
        this.gl.flush();
    }

    /**
     * Updates point positions texture.
     * Will create the texture if it is undefined.
    */
     public updatePointPosTexture(circleData: CircleData){
        if(this.pointDataTexture === undefined){
            this.pointDataTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
            this.applyDefaultTexParameters();
        }else{
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        }
        this.gl.flush();

        let sizeChanged = false;
        if(this.pointData === undefined || (this.pointData.length != this.pointTexWidth*this.pointTexWidth*4)){
            this.pointData = new Float32Array(this.pointTexWidth*this.pointTexWidth*4);
            sizeChanged = true;
        }
        
        for(let i = 0; i < this.pointCount; i++){
            this.pointData[i*4] = circleData[i].xPix;
            this.pointData[i*4+1] = circleData[i].yPix;
            this.pointData[i*4+2] = circleData[i].radiusPix;
            this.pointData[i*4+3] = circleData[i].origXpix;
        }
        
        if(sizeChanged){
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, this.pointTexWidth, this.pointTexWidth, 0, this.gl.RGBA, this.gl.FLOAT, this.pointData);
        }else{
            this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.pointTexWidth, this.pointTexWidth, this.gl.RGBA, this.gl.FLOAT, this.pointData);
        }
        this.gl.flush();
    }

    /**
     * Updates color texture based on the current settings of colorMode
     * Will create the texture if it is undefined.
    */
     public updateColorTexture(inputConfig:InputConfig, circleData: CircleData){
        if(this.pointColorsTexture === undefined){
            this.pointColorsTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
            this.applyDefaultTexParameters();
        }else{
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
        }
        this.gl.flush();

        let sizeChanged = false;
        if(this.pointColors === undefined || (this.pointColors.length != this.pointTexWidth*this.pointTexWidth*3)){
            this.pointColors = new Uint8Array(this.pointTexWidth*this.pointTexWidth*3);
            sizeChanged = true;
        }
        for(let i = 0; i < this.pointCount; i++){
            let pointColor;
            switch (inputConfig.relaxing.colorMode) {
                case "error":
                    pointColor = d3.rgb(circleData[i].errorColor);
                    break;
                case "coverage":
                    pointColor = d3.rgb(circleData[i].coverageColor);
                    break;
                case "normal":
                default:
                    if(inputConfig.images.useImages){
                        pointColor = d3.rgb("#000000");
                    }else{
                        pointColor = d3.rgb(circleData[i].origColor);
                    }
                    break;
            }
            this.pointColors[i*3] = pointColor.r;
            this.pointColors[i*3+1] = pointColor.g;
            this.pointColors[i*3+2] = pointColor.b;
        }

        if(sizeChanged){
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.pointTexWidth, this.pointTexWidth, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.pointColors);
        }else{
            this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.pointTexWidth, this.pointTexWidth, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.pointColors);
        }
        this.gl.flush();
    }

    /**
     * Updates all textures and framebuffers used to hold data if they need to be updated.
     * For some textures this is the case when the canvas size or point count changes.
    */
     private updateDataTextures(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam, updateColor: boolean){
        plotParam.supSampHeight = Math.floor(Math.floor(plotParam.height) * inputConfig.relaxing.supSampFactor);
        plotParam.supSampWidth = Math.floor(Math.floor(plotParam.width) * inputConfig.relaxing.supSampFactor);

        this.pointCount = circleData.length;
        this.pointTexWidth = Math.ceil(Math.sqrt(this.pointCount));
        
        if(plotParam.supSampWidth != this.canvas.width || plotParam.supSampHeight != this.canvas.height || plotParam.updateTextures){
            this.updateFramebuffers(plotParam);
            this.updateKdeTexture(inputConfig, plotParam.kde, plotParam);
            plotParam.updateTextures = false;
        }

        if(this.pointDataFramebufferWidth != this.pointTexWidth){
            this.updatePointFramebuffer();
        }

        this.updatePointPosTexture(circleData);

        if(updateColor) this.updateColorTexture(inputConfig, circleData);
    }

    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
    private clientWaitAsync(gl, sync, flags, interval_ms): Promise<void>{
        return new Promise<void>(function(resolve, reject) {
            function test() {
                const res = gl.clientWaitSync(sync, flags, 0);
                if (res == gl.WAIT_FAILED) {
                    reject();
                    return;
                }
                if (res == gl.TIMEOUT_EXPIRED) {
                    setTimeout(test, interval_ms);
                    return;
                }
                resolve();
            }
            test();
        });
    }

    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
     private async readPixelsAsync(w, h, format, type, dest){
        if(this.readBuffer === undefined){
            this.readBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
            this.gl.bufferData(this.gl.PIXEL_PACK_BUFFER, dest.byteLength, this.gl.STREAM_READ);
        }else{
            this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
        }
        this.gl.readPixels(0, 0, w, h, format, type, 0);
        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, null);

        const sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        this.gl.flush();

        await this.clientWaitAsync(this.gl, sync, 0, 5);
        this.gl.deleteSync(sync);

        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, this.readBuffer);
        this.gl.getBufferSubData(this.gl.PIXEL_PACK_BUFFER, 0, dest);
        this.gl.bindBuffer(this.gl.PIXEL_PACK_BUFFER, null);
    }

    /**
     * Calculates a new voronoi diagram and directly uses it to update point positions stored in circleData.
    */
     public async updateCells(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): Promise<RelaxStatus>{
        this.updateDataTextures(inputConfig, circleData, plotParam, false);
        this.calculateVoronoi();
        this.momentumFromVoronoi(inputConfig);
        this.condenseMomentum();
        this.collectPointData(inputConfig);

        if(this.rawPointData === undefined || (this.rawPointData.length != this.pointTexWidth*this.pointTexWidth*4)){
            this.rawPointData = new Float32Array(this.pointTexWidth*this.pointTexWidth*4);
        }
        await this.readPixelsAsync(this.pointTexWidth, this.pointTexWidth, this.gl.RGBA, this.gl.FLOAT, this.rawPointData);

        let relaxStatus: RelaxStatus = {
            sumDotMove: 0
            ,squaredSumDotMove: 0
            ,sumSquaredError: 0
        };
    
        for(let i = 0; i < this.pointCount; i++){
            circleData[i].xPix = this.rawPointData[i*4];
            circleData[i].yPix = this.rawPointData[i*4+1];
            relaxStatus.sumDotMove += this.rawPointData[i*4+2];
        }

        return Promise.resolve(relaxStatus);
    }

    /**
     * Calculates a new voronoi diagram and its visualization which can then be shown.
    */
     public updateVoronoiImage(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam){
        this.updateDataTextures(inputConfig, circleData, plotParam, true);
        this.calculateVoronoi();
        this.visualizeVoronoi(inputConfig);

        this.dataURL = this.canvas.toDataURL();
        this.voronoiImage.attr("xlink:href", this.dataURL);
    }

    /**
     * Calculates a new voronoi diagram using the jump-flood algorithm and stores all inbetween steps for later use.
    */
     private calculateVoronoi(){

        let clearColor:Int32Array = new Int32Array([-1, -1, -1, -1]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.voronoiIndex = 0;

        this.gl.useProgram(this.seedingShader);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.seedingShader, "u_pointDataTex"), 0);
        this.gl.uniform1i(this.gl.getUniformLocation(this.seedingShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform2f(this.gl.getUniformLocation(this.seedingShader, "u_res"), this.canvas.width, this.canvas.height);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[this.voronoiIndex]);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearBufferiv(this.gl.COLOR, 0, clearColor);
        this.gl.drawArrays(
            this.gl.POINTS,
            0,
            this.pointCount
        );
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);


        this.gl.useProgram(this.voronoiShader);

        // point texture is still bound to slot 0
        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_pointDataTex"), 0);
        
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_lastStepTex"), 1);

        this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform2i(this.gl.getUniformLocation(this.voronoiShader, "u_res"), this.canvas.width, this.canvas.height);
        
        let jumpSize = this.jumpFloodSteps - 2;
        for (let i = 0; i < this.jumpFloodSteps; i++) {
            this.gl.uniform1i(this.gl.getUniformLocation(this.voronoiShader, "u_jumpSize"), Math.pow(2, jumpSize));
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.voronoiFrameBuffers[1 - this.voronoiIndex]);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, this.jumpFloodTextures[i], 0);

            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.drawArrays(
                this.gl.TRIANGLES,
                0,
                6
            );
            this.gl.flush();
            this.voronoiIndex = 1 - this.voronoiIndex;
            if(jumpSize > 0) jumpSize--;
        }
    }

    /**
     * Calculates the momentum of a previously generated voronoi diagram for every individual pixel.
    */
     private momentumFromVoronoi(inputConfig: InputConfig){

        this.gl.useProgram(this.momentumShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_voronoiTex"), 0);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_pointDataTex"), 1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_pointTexWidth"), this.pointTexWidth);
        
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_kdeTex"), 2);
        this.gl.uniform1i(this.gl.getUniformLocation(this.momentumShader, "u_kdeTexWidth"), this.kdeTexWidth);

        this.gl.uniform1f(this.gl.getUniformLocation(this.momentumShader, "u_circlePadding"), inputConfig.dots.circlePadding);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[0]);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.drawArrays(
            this.gl.TRIANGLES,
            0,
            6
        );
        this.gl.flush();
    }

    /**
     * Condense the momentum from each pixel into the original voronoi seed positions using the previously stored information about the jump-flood steps.
    */
     private condenseMomentum(){

        this.gl.useProgram(this.condenseShader);

        this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_jumpFloodTex"), 0);
        this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_momentumTex"), 1);
        this.gl.uniform2i(this.gl.getUniformLocation(this.condenseShader, "u_res"), this.canvas.width, this.canvas.height);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.momentumIndex = 0;
        let clearColor:Float32Array = new Float32Array([0.0, 0.0, 0.0, 0.0]);
        let jumpSize = 0;
        for (let i = this.jumpFloodSteps-1; i >= 0; i--) {
            this.gl.uniform1i(this.gl.getUniformLocation(this.condenseShader, "u_jumpSize"), Math.pow(2, jumpSize));

            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.jumpFloodTextures[i]);

            this.gl.activeTexture(this.gl.TEXTURE1);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[this.momentumIndex]);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.momentumFrameBuffers[1 - this.momentumIndex]);

            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.clearBufferfv(this.gl.COLOR, 0, clearColor);
            this.gl.drawArrays(
                this.gl.TRIANGLES,
                0,
                6
            );
            this.momentumIndex = 1 - this.momentumIndex;
            if(i < this.jumpFloodSteps-1) jumpSize++;
        }
        this.gl.flush();
    }

    /**
     * Collect the new point data from the voronoi seed positions and store them in the pointDataTexture.
    */
     private collectPointData(inputConfig: InputConfig){

        this.gl.useProgram(this.collectShader);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.momentumTextures[this.momentumIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.collectShader, "u_momentumTex"), 0);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.collectShader, "u_pointDataTex"), 1);

        this.gl.uniform1f(this.gl.getUniformLocation(this.collectShader, "u_xCorrection"), inputConfig.relaxing.xCorrection);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.pointDataNewFramebuffer);
        this.gl.viewport(0, 0, this.pointDataFramebufferWidth, this.pointDataFramebufferWidth);
        this.gl.drawArrays(
            this.gl.TRIANGLES,
            0,
            6
        );
        this.gl.flush();
    }

    /**
     * Will visualize the current voronoi diagram so it can be shown to the user or saved.
    */
     public visualizeVoronoi(inputConfig: InputConfig){

        this.gl.useProgram(this.visualizeShader);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.voronoiTextures[this.voronoiIndex]);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_voronoiTex"), 0);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointDataTex"), 1);
        
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointColorsTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointColTex"), 2);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_pointTexWidth"), this.pointTexWidth);
        
        this.gl.activeTexture(this.gl.TEXTURE3);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_kdeTex"), 3);
        this.gl.uniform1i(this.gl.getUniformLocation(this.visualizeShader, "u_kdeTexWidth"), this.kdeTexWidth);

        this.gl.uniform1f(this.gl.getUniformLocation(this.visualizeShader, "u_lightEdges"), inputConfig.images.useImages ? 0.0 : 1.0);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(
            this.gl.TRIANGLES,
            0,
            6
        );
        this.gl.flush();
    }

    /**
     * Will calculate the current overlap of the circles.
    */
     public showOverlap(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): OverlapStatus {
        this.updateDataTextures(inputConfig, circleData, plotParam, false);
        
        this.gl.useProgram(this.overlapShader);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.pointDataTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_pointDataTex"), 0);
        this.gl.uniform1ui(this.gl.getUniformLocation(this.overlapShader, "u_pointTexWidth"), this.pointTexWidth);
        this.gl.uniform1ui(this.gl.getUniformLocation(this.overlapShader, "u_pointCount"), this.pointCount);
        
        let paddingWidth = (inputConfig.relaxing.overlapUsePadding) ? 1.0-inputConfig.dots.circlePadding : 1.0;
        this.gl.uniform1f(this.gl.getUniformLocation(this.overlapShader, "u_dotSizeScale"), paddingWidth);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.kdeTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_kdeTex"), 1);
        this.gl.uniform1i(this.gl.getUniformLocation(this.overlapShader, "u_kdeTexWidth"), this.kdeTexWidth);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(
            this.gl.TRIANGLES,
            0,
            6
        );

        let data = new Uint8Array(this.canvas.width*this.canvas.height*4);
        this.gl.readPixels(0, 0, this.canvas.width, this.canvas.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        let overlapCount = 0;
        let totalCount = 0;
        for(let i = 0; i < data.length; i+=4){
            if(data[i+3] == 255){//check if pixel is not transparent
                totalCount++;
                if(data[i+1] != 255){//check if green value doesn't make it white
                    overlapCount++;
                }
            }
        }

        return {
            SOP: overlapCount
            ,MOP: overlapCount/totalCount
            }
    }

    /**
     * Returns the data URL containing the latest visualization.
    */
     public getDataURL(){
        return this.dataURL;
    }

    /*
        https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        Mulberry32 is a simple generator with a 32-bit state, but is extremely fast and has good quality
        (author states it passes all tests of gjrand testing suite and has a full 232 period, but I haven't verified).
    */
    private mulberry32(a: number) {
        return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }
}
