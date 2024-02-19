import { Injectable } from "@angular/core";
import { LoadingService } from "../../service/loading.service";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoadingInterceptor {

  private totalHttpRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalHttpRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalHttpRequests--;
        if (this.totalHttpRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    )
  }
}
