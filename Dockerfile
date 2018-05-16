# FROM node:8.11.0
# ENV NODE_ENV production
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install
# COPY . .
# EXPOSE 7001
# CMD npm run dev


# 指定我们的基础镜像是node，版本是v8.0.0
FROM node:8.11.0
# 配置环境变量
ENV NODE_ENV production

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
# COPY . /myapp/

# cd到app文件夹下
WORKDIR .

# 安装项目依赖包
RUN npm install

# 容器对外暴露的端口号
# EXPOSE 7001

# 容器启动时执行的命令，类似npm run start
CMD ["npm", "start"]