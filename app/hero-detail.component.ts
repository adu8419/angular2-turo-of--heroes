import { 
	Component, 
	Input, 
	Output,
	OnInit,
	EventEmitter  } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
    @Output() close = new EventEmitter();
    hero: Hero;
    error: any;
    navigated: boolean = false;	

	constructor(
	  private heroService: HeroService,
	  private routeParams: RouteParams) {
	}

	ngOnInit() {
     	if(this.routeParams.get('id') !== null) {
     		let id = +this.routeParams.get('id');
     		this.navigated = true;
			this.heroService.getHero(id)
     	        .then(hero => this.hero = hero);			
     	}else {
     		this.navigated = false;
     		this.hero = new Hero();
     	}    
	}

	goBack(saveHero: Hero = null) {
		this.close.emit(saveHero);
		if(this.navigated) { window.history.back(); }
	}

	save() {
		this.heroService
		    .save(this.hero)
		    .then(hero => {
		       this.hero = hero;
		       this.goBack(hero);	
		    })
		    .catch(error => this.error = error);
	}

}
