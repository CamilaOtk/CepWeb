import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './map.components.html',
  styleUrls: ['./map.components.css'],
})
export class MapComponent {
  title = 'CodeSandbox';
  map: google.maps.Map | any;
  heatmap: google.maps.visualization.HeatmapLayer | any;

  @Input() objZipCodeGoogle: any = null;

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges() {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: {
          lat: this.objZipCodeGoogle?.geometry?.location?.lat ?? 37.775,
          lng: this.objZipCodeGoogle?.geometry?.location?.lng ?? -122.434,
        },
        mapTypeId: 'roadmap',
      }
    );
  }

  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: { lat: -23.5541938, lng: -46.9486096 },
        mapTypeId: 'roadmap',
      }
    );

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: [],
      map: this.map ?? null,
    });
    document
      .getElementById('toggle-heatmap')!
      .addEventListener('click', this.toggleHeatmap);
    document
      .getElementById('change-gradient')!
      .addEventListener('click', this.changeGradient);
    document
      .getElementById('change-opacity')!
      .addEventListener('click', this.changeOpacity);
    document
      .getElementById('change-radius')!
      .addEventListener('click', this.changeRadius);
    document
      .getElementsByClassName('gmnoprint')[0].classList.add(' hidden')
  }

  toggleHeatmap(): void {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }

  changeGradient(): void {
    const gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)',
    ];
    this.heatmap.set(
      'gradient',
      this.heatmap.get('gradient') ? null : gradient
    );
  }

  changeRadius(): void {
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
  }
  changeOpacity(): void {
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
  }
}
