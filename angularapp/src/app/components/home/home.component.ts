
import { Component, AfterViewInit } from '@angular/core';



@Component({

 selector: 'app-home',

 templateUrl: './home.component.html',

 styleUrls: ['./home.component.css']

})

export class HomeComponent implements AfterViewInit {

 ngAfterViewInit() {

  const observer = new IntersectionObserver((entries) => {

   entries.forEach(entry => {

    if (entry.isIntersecting) {

     entry.target.classList.add('visible');

    }

   });

  }, { threshold: 0.1 });



  document.querySelectorAll('section').forEach(section => {

   observer.observe(section);

  });

 }

}