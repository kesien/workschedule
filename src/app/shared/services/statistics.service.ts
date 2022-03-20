import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StatisticsModel } from "../models/statistics.model";

@Injectable({
    providedIn: 'root',
})
export class StatisticsService {
    baseUrl = environment.baseApiUrl + 'statistics';

    constructor(private http: HttpClient) {}

    getStatistics(year: number, month: number): Observable<StatisticsModel> {
        return this.http.get<StatisticsModel>(this.baseUrl + `/${year}/${month}`);
    }
}