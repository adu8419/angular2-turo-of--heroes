import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero  } from './hero';

@Injectable()
export class HeroService {
	private heroesUrl: string = 'app/heroes';


	constructor(private http: Http) {}

	getHeroes() {
		//return Promise.resolve(HEROES);
		return this.http.get(this.heroesUrl)
		           .toPromise()
		           .then(reponse => reponse.json().data)
		           .catch(this.handleError);
	}

	getHeroesSlowly() {
	    return new Promise<Hero[]>(resolve =>
	      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
	    );
    }

    getHero(id: number) {
    	return this.getHeroes()
    			   .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    delete(hero: Hero) {
    	let headers = new headers();
    	headers.append('Content-Type', 'application/json');

    	let url = `${this.heroesUrl}/${hero.id}`;

    	return this.http
    	           .delete(url, headers)
    	           .toPromise()
    	           .catch(this.handleError);
    }

    save(hero: Hero) {
    	if(hero.id) {
    		return this.put(hero);
    	}
    	return this.post(hero);
    }
    
    private handleError(error: any) {
    	console.error('An error occurred', error);
    	return Promise.reject(error.message || error);
    }

    private post(hero: Hero): Promise<Hero> {
    	let headers = new Headers({
    		'Content-Type': 'application/json'	
    	});

    	return this.http
    	           .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
    			   .toPromise()
    			   .then(res => res.json().data)
    			   .catch(this.handleError);
    }

    private put(hero: Hero) {
    	let headers = new Headers();
    	headers.append('Content-Type', 'application/json');

    	let url = `${this.heroesUrl}/${hero.id}`;

    	return this.http
    			   .put(url, JSON.stringify(hero), {headers: headers})
    			   .toPromise()
    			   .then(() => hero)
    			   .catch(this.handleError);
    }

    
}