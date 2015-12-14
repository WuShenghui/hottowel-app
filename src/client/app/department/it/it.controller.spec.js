/* jshint -W117, -W030 */
describe('ITController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.department.it');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('ITController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('IT controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of IT', function() {
                expect(controller.title).to.equal('IT');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
