## 红矮星后台管理系统

管理红矮星所有应用。

### 开始开发

启动项目：

```bash
git clone https://github.com/jiangxiaoqiang/react-admin.git
cd react-admin
yarn 
umi dev
```

macOS本机Nginx配置（/System/Volumes/Data/opt/homebrew/etc/nginx/conf.d/reddwarf-admin.conf）：

```
server {
        listen 8083;
        server_name admin.reddwarf.com;
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
        location ^~ /service/ {
            proxy_pass  https://admin.poemhub.top/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For;
            $proxy_add_x_forwarded_for;
        }
}
```

macOS启动重启nginx:

```bash
# 启动本机nginx
brew services start nginx
# 启动本机nginx(指定路径与配置文件)
/usr/local/Cellar/nginx/1.19.8/bin/nginx -c nginx.conf
# 重启nginx
brew services restart nginx
```

启动nginx后访问：http://127.0.0.1:8083/user/login。
