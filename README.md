# html2pdf
> Simple html to pdf converter in form of a HTTP server (Proof of Concept)

### Usage

```bash
$ docker-compose up
$ curl -s -F "html=@page.html" http://localhost:3000/convert -o page.pdf
```
