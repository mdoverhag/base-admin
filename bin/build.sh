#!/bin/bash

yarn build
rm -r ../base_server/priv/static/*
cp -r build/* ../base_server/priv/static/
cp build/index.html ../base_server/lib/base_server_web/templates/layout/app.html.eex
gsed -i 's/<\/noscript>/<\/noscript><script>window.userToken="<%=assigns[:user_token]%>"<\/script>/' ../base_server/lib/base_server_web/templates/layout/app.html.eex
