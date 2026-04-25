FROM node:14

# instala expo cli global
RUN npm install -g expo-cli

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 19000 19001 19002

CMD ["npm", "start"]
