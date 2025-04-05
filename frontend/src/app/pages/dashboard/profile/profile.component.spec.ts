import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['getUserInfo']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar informações do usuário no ngOnInit', async () => {
    const mockUser = {
      attributes: {
        name: 'Chicão',
        email: 'chicao@email.com',
      },
    };
    authServiceSpy.getUserInfo.and.resolveTo(mockUser);

    await component.ngOnInit();

    expect(component.user).toEqual(mockUser.attributes);
    expect(authServiceSpy.getUserInfo).toHaveBeenCalled();
  });
});
