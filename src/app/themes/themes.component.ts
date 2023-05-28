import { Component, OnInit , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  @Output() genreChanged: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  
  }
  changeTomachine(){
    this.genreChanged.emit("machine")
  }

  changeTomaterial(){
    this.genreChanged.emit("material")
  }

  changeTohand(){
    this.genreChanged.emit("hand")
  }
  changeToall(){
    this.genreChanged.emit("all")
  }
}
