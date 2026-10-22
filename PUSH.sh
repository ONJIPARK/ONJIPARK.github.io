#!/bin/bash
# ONJI-PARK 계정의 ONJI-PARK.github.io 리포에 올리는 스크립트 (mp 폴더 안에서 실행)
set -e
git init
git add .
git commit -m "init portfolio"
git branch -M main
git remote add origin https://github.com/ONJI-PARK/ONJI-PARK.github.io.git
git push -u origin main
echo "완료. 리포 Settings > Pages > Source 를 'GitHub Actions' 로 바꾸면 https://onji-park.github.io 에 배포됩니다."
