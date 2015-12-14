/* jshint -W117, -W030 */
describe('HRController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.department.hr');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('HRController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('HR controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of HR', function() {
                expect(controller.title).to.equal('HR');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
