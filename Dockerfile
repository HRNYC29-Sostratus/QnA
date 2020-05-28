FROM node:10
WORKDIR /QnA
COPY package.json /QnA
RUN npm install
COPY . /QnA
CMD npm run
EXPOSE 3000