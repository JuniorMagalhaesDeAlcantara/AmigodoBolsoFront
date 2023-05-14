import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicasParaOBolsoComponent } from './dicas-para-o-bolso.component';

describe('DicasParaOBolsoComponent', () => {
  let component: DicasParaOBolsoComponent;
  let fixture: ComponentFixture<DicasParaOBolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicasParaOBolsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicasParaOBolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
