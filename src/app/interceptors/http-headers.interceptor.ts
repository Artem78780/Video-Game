import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

 
@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Key': 'dfed6e196amsh64f5168fab207b3p1ac245jsnd24c23df5c0a',
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
              },
            setParams: {
                key: '2392f834b03645bc8219ad33acd7c8c2'
            }
        })
        return next.handle(req)
    }
}