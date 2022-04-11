import { HttpHeaders } from '@angular/common/http';

export function addAuthorization(){
        const http = new HttpHeaders({'Content-Type': 'application/json'});
        const token = sessionStorage.getItem('token');
        if (token) {
            return http.append('Authorization', 'Bearer ' + token);
        }
        return http;
}

