#!/bin/bash

echo "\033[33m ------- 开始检测 git 仓库状态 ------- \033[0m\n"

git_status=`git status`
git_pull="update your local branch"
git_clean="nothing to commit, working tree clean"


if [[ $git_status =~ $git_pull ]]
then

  echo "\033[31m ------- 请更新你的 git 仓库 ------ \033[0m \n"
  exit

else

  # 把最新版本号写入 VERSION_ID
  git_log=`git log --oneline --decorate`
  ID=${git_log:0:7}
  
  echo $ID > ./config/VERSION_ID 

  echo "------- 发布静态资源到 测试环境 -------\n"

  npm run deploy

  echo "\033[32m \n------- 版本号已更新为$ID,并成功发布资源到测试环境 -------\033[0m \n"

  echo "\033[32m \n------- 请及时 commit git 仓库，并 push 到远程 -------\033[0m \n"

  exit

fi