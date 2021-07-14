import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalChatComponent } from './signal-chat.component';

describe('SignalChatComponent', () => {
  let component: SignalChatComponent;
  let fixture: ComponentFixture<SignalChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
