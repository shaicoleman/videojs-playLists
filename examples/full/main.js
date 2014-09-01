$(function() {
  var videos = [
    {
      src: [
        'http://stream.flowplayer.org/bauhaus/624x260.webm',
        'http://stream.flowplayer.org/bauhaus/624x260.mp4',
        'http://stream.flowplayer.org/bauhaus/624x260.ogv'
      ],
      poster: 'http://flowplayer.org/media/img/demos/minimalist.jpg',
      title: 'Video 1'
    },
    {
      src: [
        'http://stream.flowplayer.org/night3/640x360.webm',
        'http://stream.flowplayer.org/night3/640x360.mp4',
        'http://stream.flowplayer.org/night3/640x360.ogv'
      ],
      poster: 'http://flowplayer.org/media/img/demos/playlist/railway_station.jpg',
      title: 'Video 2'
    },
    {
      src: [
        'http://stream.flowplayer.org/functional/624x260.webm',
        'http://stream.flowplayer.org/functional/624x260.mp4',
        'http://stream.flowplayer.org/functional/624x260.ogv'
      ],
      poster: 'http://flowplayer.org/media/img/demos/functional.jpg',
      title: 'Video 3'
    }
  ];

  var videoPlaylistModule = {
    init: function(){
      this.els = {};
      this.cacheElements();
      this.addVideoIndex();
      this.initVideo();
      this.updateActiveVideo();
      this.bindEvents();
    },
    cacheElements: function(){
      this.els.$playlist = $('div.playlist > ul');
      this.els.$next = $('#next');
      this.els.$prev = $('#prev');
    },
    initVideo: function(){
      this.player = videojs('video');
      this.player.playList(videos);
    },
    addVideoIndex: function(){
      this.els.$playlist.find('li').each(function( index ) {
        $(this).attr('data-videoplaylist', index);
      });
    },
    updateActiveVideo: function(){
      this.els.$playlist.find('li').removeClass('active');
      this.els.$playlist.find('li[data-videoplaylist="' + this.player.pl.current +'"]').addClass('active');
    },
    bindEvents: function(){
      var self = this;
      this.els.$playlist.find('li').on('click', $.proxy(this.selectVideo,this));
      this.els.$next.on('click', $.proxy(this.nextOrPrev,this));
      this.els.$prev.on('click', $.proxy(this.nextOrPrev,this));
      this.player.on('next', function(e){ self.updateActiveVideo.apply(self); });
      this.player.on('prev', function(e){ self.updateActiveVideo.apply(self); });
      this.player.on('lastVideoEnded', function(e){ });
    },
    nextOrPrev: function(e){
      var clicked = $(e.target);
      this.player[clicked.attr('id')]();
    },
    selectVideo: function(e){
      var clicked = e.target.nodeName === 'LI' ? $(e.target) : $(e.target).closest('li');

      if (!clicked.hasClass('active')){
        var videoIndex = clicked.data('videoplaylist');
        this.player.playList(videoIndex);
        this.updateActiveVideo();
      }
    }
  };

  videoPlaylistModule.init();
});
