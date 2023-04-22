FROM fedora:37

WORKDIR /Rin-Tohsaka

COPY . /Rin-Tohsaka

RUN yarn

CMD ["yarn", "start"]