import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private defaultLang = "en";

    constructor(private translate: TranslateService, private config: PrimeNGConfig) {}

    async setLanguage() {
        
    }

    switchLanguage(lang: string) {
        this.translate.use(lang).pipe(
            catchError(err => {
                console.log(`Locale ${lang} not supproted, using default ${this.defaultLang}`);
                return this.translate.getTranslation(this.defaultLang);
            }));
        this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
        localStorage.setItem('lang', lang);
    }
}