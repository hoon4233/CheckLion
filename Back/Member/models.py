from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email', unique=True)
    name = models.CharField('이름', max_length=30, blank=True)
    is_staff = models.BooleanField('스태프 권한', default=False)
    is_active = models.BooleanField('사용중', default=True)
    date_joined = models.DateTimeField('가입일', default=timezone.now)
    team_id = models.ForeignKey("Team", related_name="team", on_delete=models.CASCADE, db_column="team_id", null=True, blank=True)  # blank true로 할지 생각해보아야 할듯

    objects = UserManager()
    
    USERNAME_FIELD = 'email'                     
    REQUIRED_FIELDS = ['name']                 

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        swappable = 'AUTH_USER_MODEL'

    def email_user(self, subject, message, from_email=None, **kwargs): # 이메일 발송 메소드
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Team(models.Model):
    name = models.CharField(max_length = 20, verbose_name = '팀이름', primary_key=True)
    total_point = models.IntegerField(verbose_name="총점수")
    register_date = models.DateTimeField(auto_now_add=True, verbose_name = '등록날짜')
    update_date = models.DateTimeField(auto_now=True, verbose_name = '마지막수정일')

    def __str__(self):
        return self.name


    def info(self):
        return f"팀이름 : {self.name}, 팀점수 : {self.total_point}"

    class Meta :
        db_table = 'Team_talbe'
        verbose_name = '팀'
        verbose_name_plural = '팀들'


class Score(models.Model):
    user_id = models.ForeignKey("User", related_name="user", on_delete=models.CASCADE, db_column="user_id")
    week = models.IntegerField(verbose_name="주차")
    assignment = models.BooleanField(verbose_name="과제체크")
    attendance = models.BooleanField(verbose_name="출석체크")
    lecture = models.BooleanField(verbose_name="강의체크")

    def __str__(self):
        return f"user_id : {self.user_id}, week : {self.week}, 과제, 출석, 강의 : {self.assignment, self.attendance, self.lecture}"

    class Meta :
        db_table = 'Score_talbe'
        verbose_name = '점수'
        verbose_name_plural = '점수들'

        constraints = [
        models.UniqueConstraint(fields=['user_id', 'week'], name='userAndweek')
        ]


class AdditionalPoint(models.Model):
    week = models.IntegerField(verbose_name="주차", primary_key=True)
    first_team = models.ForeignKey("Team", related_name="first_team", on_delete=models.CASCADE, db_column="first_team")
    second_team = models.ForeignKey("Team", related_name="second_team", on_delete=models.CASCADE, db_column="second_team")
    third_team = models.ForeignKey("Team", related_name="third_team", on_delete=models.CASCADE, db_column="third_team")

    class Meta :
        db_table = 'AdditionalPoint_talbe'
        verbose_name = '추가점수'
        verbose_name_plural = '추가점수들'