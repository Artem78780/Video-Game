import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/interfaces';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort!: string
  games!: Array<Game>
  routeSub!: Subscription;
  gameSub!: Subscription

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGame('metacritic', params['game-search'])
      } else {
        this.searchGame('metacritic')
      }
    })
  }

  searchGame(sort: string, search?: any): void {
   this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList)
      })
  }

  openGameDetails(id: string) {
    this.router.navigate(['details', id])
  }

  ngOnDestroy(): void {
    if(this.gameSub) {
      this.gameSub.unsubscribe()
    }

    if(this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }
}
