from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
 
 
class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
 
        user = self.model(email=UserManager.normalize_email(email))
 
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, password):
        u = self.create_user(email=email, password=password)
        u.is_superuser = True
        u.is_staff = True
        u.save(using=self._db)
        return u
 
 
class User(AbstractBaseUser,  PermissionsMixin):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    password = models.CharField(max_length=255, blank=True, null=True)
 
    objects = UserManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
 
    class Meta:
        db_table='user'