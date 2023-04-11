import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCentrocustoComponent } from './grafico-centrocusto.component';

describe('GraficoCentrocustoComponent', () => {
  let component: GraficoCentrocustoComponent;
  let fixture: ComponentFixture<GraficoCentrocustoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoCentrocustoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoCentrocustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
