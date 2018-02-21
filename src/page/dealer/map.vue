<template>
  <div class="map">
    <div id='allmap'></div>
    <span class="return" @click="returnback"></span>
  </div>

</template>

<script>
  import BMap from 'BMap';

  export default {
    data() {
      return {
        location: {},
        opts: {
          width: 250,
          height: 80,
          title: "信息窗口",
          enableMessage: true
        },
        mapBox: 'overflow: hidden;clear: both;position: relative;padding-right:.8rem;padding-bottom: .18rem;',
        map: '',
        mapImgStyle: '',
        mapImg: '../../../static/images/navigation.png',
        dealerNameStyle: 'width: 3.2rem;font-size: .24rem;line-height: .36rem;margin-top: .05rem;font-weight: bold;color: #333;',
        mapAdressStyle: 'width: 3.2rem;font-size: .22rem;line-height: .34rem;color: #666;margin-top: .3rem;',
/*        agcy400TelStyle: 'width: 3.2rem;font-size: .22rem;line-height: .34rem;color: #666;',*/
        dealerDate: '',
        dealers: [],
        cityId: '',
        cityName: '',
        longitude: 116.489635,
        latitude: 40.000384
      }
    },
    created() {
      this.cityId = this.$route.query.cityId;
      this.cityName = this.$route.query.cityName;
    },
    mounted() {
      this.obtain_location();
    },
    methods: {
      returnback() {
        var bridge = getJsBridge();
        bridge.call("finishActivity");
      },
      obtain_location() {
        var location = {
          longitude: this.longitude,
          latitude: this.latitude
        }
        this.getCity(location);
      },
      initMap(data) {
        this.map = new BMap.Map('allmap');
        var point;
        if (data) {
          point = new BMap.Point(data.longitude, data.latitude);
        } else {
          point = new BMap.Point(this.longitude, this.latitude);
        }
        var marker = new BMap.Marker(point, 13);
        this.map.setCenter(this.cityName);

        this.dealerDate = {
          "serviceName": "app.query.dealerList",
          "timestamp": this.$global().timestamp,
          "serialNumber": this.$global().serialNumber,
          "request_data": {
            "page": "",
            "pageSize": "",
            "cityId": this.cityId,
            "dealerCode": "",
            "keyword": "",
            "queryType": "2"
          }
        }
        this.$axios(this.dealerDate).then((response) => {
          this.dealers = response.response_data.dealers;
          for (var i = 0; i < this.dealers.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(this.dealers[i].latitude, this.dealers[i].longitude));
            if (this.dealers[i].shopHomeAddress.length > 14) {
              this.mapImgStyle = "position: absolute;zoom:1;overflow:hidden;width:.7rem;right:0;bottom:.13rem;"
            } else {
              this.mapImgStyle = "position: absolute;zoom:1;overflow:hidden;width:.7rem;right:0;bottom:0;"
            }
            var content = '<div style="' + this.mapBox + '">' +
              '<a href="goDealer://' + this.dealers[i].shopHomeNick + '?dealerCode=' + this.dealers[i].dealerCode + '&shopHomeNick=' + this.dealers[i].shopHomeNick + '&cityId=' + this.cityId + '">' +
              '<h2 style="' + this.dealerNameStyle + '">' + this.dealers[i].shopHomeNick + '</h2>' +
              '<p style="' + this.mapAdressStyle + '">' + this.dealers[i].shopHomeAddress + '</p>' +
              '</a>' +
              '<a href="navigation://goMap.com?lat=' + this.dealers[i].longitude + '&lon=' + this.dealers[i].latitude + '&dealerName=' + this.dealers[i].shopHomeNick + '"><img style="' + this.mapImgStyle + '" src="' + this.mapImg + '"/></a>' +
              '</div>';
            this.map.addOverlay(marker);
            this.addClickHandler(content, marker);
            var label = new BMap.Label(this.dealers[i].shopHomeNick, {offset: new BMap.Size(20, -10)});
            label.setStyle({
              color: "#333",
              fontSize: "12px",
              height: "20px",
              lineHeight: "20px",
              fontFamily: "微软雅黑",
              borderColor: "#ccc"
            });
            marker.setLabel(label);
          }
        });

        this.map.centerAndZoom(point, 11)
        var ctrlNav = new window.BMap.NavigationControl({
          anchor: 'BMAP_ANCHOR_BOTTOM_LEFT',
          type: 'BMAP_NAVIGATION_CONTROL_LARGE'
        });
        this.map.addControl(ctrlNav)
        var ctrlSca = new window.BMap.ScaleControl({
          anchor: 'BMAP_ANCHOR_BOTTOM_LEFT'
        });
        this.map.addControl(ctrlSca);
        this.map.enableScrollWheelZoom(true);
        this.map.enableInertialDragging(true);
        this.map.enableContinuousZoom(true);
      },
      addClickHandler(content, marker) {
        marker.addEventListener("click", function (e) {
          var p = e.target;
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
          var infoWindow = new BMap.InfoWindow(content, this.opts);
          this.map.openInfoWindow(infoWindow, point);
        });
      },
      getCityIdFunc(result) {
      },
      getCity(location) {
        this.initMap(location);
        var mycity = new BMap.LocalCity();
        mycity.get(this.getCityIdFunc);
      },
      tel400(){
          var bridge = getJsBridge();
            bridge.call("callTel",{tel:this.agcy400Tel});
      }
    }
  }
</script>
