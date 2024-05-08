import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModeloComponent } from './create-modelo.component';

describe('CreateModeloComponent', () => {
  let component: CreateModeloComponent;
  let fixture: ComponentFixture<CreateModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
