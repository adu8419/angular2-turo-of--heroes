import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html',
	styleUrl: ['app/heroes.component.css']
})

export class HeroesComponent implements OnInit{
	title = 'Tour of Heroes';
	selectedHero: Hero;
    heroes: Hero[];

	constructor(private heroService: HeroService) {}
	ngOnInit() {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes);
	}
	select(hero: Hero) {
		this.selectedHero = hero;
	}
	gotoDetail() {
      this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}



