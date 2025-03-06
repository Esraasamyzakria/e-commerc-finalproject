import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GategoriesdetailesComponent } from './gategoriesdetailes.component';

describe('GategoriesdetailesComponent', () => {
  let component: GategoriesdetailesComponent;
  let fixture: ComponentFixture<GategoriesdetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GategoriesdetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GategoriesdetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
