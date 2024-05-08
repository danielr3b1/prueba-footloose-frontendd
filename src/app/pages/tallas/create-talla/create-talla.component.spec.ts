import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTallaComponent } from './create-talla.component';

describe('CreateTallaComponent', () => {
  let component: CreateTallaComponent;
  let fixture: ComponentFixture<CreateTallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTallaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
