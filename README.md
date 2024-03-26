# Tessera

An app to find cool events at the hottest venues in New York City.

## Frontend

## Backend

The app uses Django for the backend with a PostgreSQL database hosted on Amazon's Relational Database Services. The backend is made up of two models: venues and events.

![ERD](./readme-files/ERD.png)

Both models have full CRUD as well as index and show routes. The venue routes are set up so that the events details are nested within the venue details to enable easy access of information on the frontend.

```python
class EventSerializer(serializers.HyperlinkedModelSerializer):
    venue = serializers.HyperlinkedRelatedField(
        view_name='venue_detail',
        read_only=True
    )
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(),
        source='venue'
    )
    class Meta:
       model = Event
       fields = ('id','venue', 'venue_id', 'name', 'venue_type', 'date', 'door_time', 'start_time', 'ga_price', 'vip_price', 'image_url')

class VenueSerializer(serializers.HyperlinkedModelSerializer):
    events = EventSerializer (
        many=True,
        read_only=True
    )
    venue_url = serializers.ModelSerializer.serializer_url_field(
        view_name='venue_detail'
    )
    class Meta:
       model = Venue
       fields = ('id','name', 'venue_url', 'address', 'capacity', 'poc_name', 'poc_email','image_url', 'events')
    
```