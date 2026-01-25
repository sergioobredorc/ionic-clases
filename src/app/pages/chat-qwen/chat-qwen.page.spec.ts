import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatQwenPage } from './chat-qwen.page';

describe('ChatQwenPage', () => {
  let component: ChatQwenPage;
  let fixture: ComponentFixture<ChatQwenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatQwenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
