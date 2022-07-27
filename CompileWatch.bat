@echo off
cd testing

tsc -p "%~dp0ts_rawFiles" -w -d

