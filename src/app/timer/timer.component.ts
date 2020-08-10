import { Component, OnInit } from '@angular/core';
import {timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  time = new Date(0, 0, 0, 0, 0, 0)
  ticker: number
  stop = false
  isWaiting = false
  alert = false
  showGuide = false

  countdown = timer(0, 1000)
  subscription: Subscription

  constructor() {
  }

  ngOnInit(): void {
  }

  startStop() {
    if (!this.stop) {
      this.ticker = 0
      this.subscription = this.countdown.subscribe(
        (n) => {
          this.ticker = n
          this.time.setSeconds(n)
          this.time.setMinutes(n / 60)
          this.time.setHours(n / 3600)
        }
      )
    } else if (this.isWaiting && this.stop) {
      this.subscription = this.countdown.subscribe(
        (n) => {
          n += this.ticker
          console.log(n)
          this.time.setSeconds(n)
          this.time.setMinutes(n / 60)
          this.time.setHours(n / 3600)
        }
      )
    } else if (this.stop && !this.isWaiting) {
      this.subscription.unsubscribe()
      this.time = new Date(0, 0, 0, 0, 0, 0)
      this.ticker = 0
    }
    this.stop = !this.stop
  }

  reset() {
    this.subscription.unsubscribe()
    this.time = new Date(0, 0, 0, 0, 0, 0)
    this.ticker = 0
    this.stop = false
    this.isWaiting = false
    this.startStop()
  }

  wait() {
    this.subscription.unsubscribe()
    this.isWaiting = true
    this.stop = true
  }

  showAlert() {
    setTimeout(() => {
      if (!this.isWaiting)
        this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 2000)
    }, 300)
  }
}
