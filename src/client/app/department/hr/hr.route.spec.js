/* jshint -W117, -W030 */
describe('hr routes', function () {
    describe('state', function () {
        var view = 'app/hr/hr.html';

        beforeEach(function() {
            module('app.hr', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state hr to url /hr ', function() {
            expect($state.href('hr', {})).to.equal('/hr');
        });

        it('should map /hr route to hr View template', function () {
            expect($state.get('hr').templateUrl).to.equal(view);
        });

        it('of hr should work with $state.go', function () {
            $state.go('hr');
            $rootScope.$apply();
            expect($state.is('hr'));
        });
    });
});
