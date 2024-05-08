import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarItemComponent } from './siderbar-item.component';

describe('SiderbarItemComponent', () => {
  let component: SiderbarItemComponent;
  let fixture: ComponentFixture<SiderbarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiderbarItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiderbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
