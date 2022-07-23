#!/bin/bash
BASEDIR=$(dirname $0)
build_id=$(cat ${BASEDIR}/config/VERSION_ID)
echo --------- 编译版本号为 $build_id -----------
export BUILD_ID=$build_id