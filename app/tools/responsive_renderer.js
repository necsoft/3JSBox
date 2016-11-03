var responsive_renderer = function(camera,renderer){

    this.camera = camera;
    this.renderer = renderer;

    var self = this;

    window.onresize = function(){

        self.renderer.setSize(window.innerWidth,window.innerHeight);
        var aspectRatio = window.innerWidth/window.innerHeight;
        self.camera.aspect = aspectRatio;
        self.camera.updateProjectionMatrix();

        console.log('%c'+window.innerWidth+'x'+window.innerHeight+"px", 'background:#00ffb3;color:#333333');

        if (window.innerWidth === 1280 && window.innerHeight === 720) {
            console.log('%c'+'720p', 'background:#333333;color:#00ffb3');
        }

        if (window.innerWidth === 1920 && window.innerHeight === 1080) {
            console.log('%c'+'1080p', 'background:#333333;color:#00ffb3');
        }

        if (window.innerWidth === 3840 && window.innerHeight === 2160) {
            console.log('%c'+'4K', 'background:#333333;color:#00ffb3');
        }

    }

}

responsive_renderer.prototype.update = function(camera,renderer){
    this.camera = camera;
    this.renderer = renderer;

    this.renderer.setSize(window.innerWidth,window.innerHeight);
    var aspectRatio = window.innerWidth/window.innerHeight;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
}

module.exports = responsive_renderer;