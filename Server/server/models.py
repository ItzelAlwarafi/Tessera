from django.db import models

# Create your models here.

class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    capacity=models.IntegerField()
    poc_name=models.CharField(max_length=100)
    poc_email=models.CharField(max_length=100)
    image_url=models.URLField()


    def __str__(self):
        return self.name


class Event(models.Model):
    venue=models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    name=models.CharField(max_length=100)
    venue_type=models.CharField(max_length=100)
    date=models.DateField()
    door_time=models.TimeField(blank=True)
    start_time=models.TimeField()
    ga_price=models.IntegerField()
    vip_price=models.IntegerField(blank=True)
    image_url=models.URLField()

    def __srt__(self):
        return self.name
    
