import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTallaComponent } from './edit-talla.component';

describe('EditTallaComponent', () => {
  let component: EditTallaComponent;
  let fixture: ComponentFixture<EditTallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTallaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
