import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeloComponent } from './edit-modelo.component';

describe('EditModeloComponent', () => {
  let component: EditModeloComponent;
  let fixture: ComponentFixture<EditModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
