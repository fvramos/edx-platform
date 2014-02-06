(function (requirejs, require, define, undefined) {

require(
['video/01_initialize.js'],
function (Initialize) {
    describe('Initialize', function () {
        describe('saveState function', function () {
            var state;

            beforeEach(function () {
                state = {
                    videoPlayer: {
                        currentTime: 9.10101
                    },
                    storage: {
                        setItem: function () {}
                    },
                    config: {
                        saveStateUrl: 'sdfhasjfhjkfhfas'
                    }
                };

                spyOn($, 'ajax');
                spyOn(state.storage, 'setItem');
            });

            afterEach(function () {
                state = undefined;
            });

            it('data is not an object, async is true', function () {
                var asyncVal = true,
                    positionVal = Math.round(state.videoPlayer.currentTime);

                Initialize.prototype.saveState.call(state, asyncVal);

                expect(state.storage.setItem).toHaveBeenCalledWith(
                    'position',
                    positionVal,
                    true
                );
                expect($.ajax).toHaveBeenCalledWith({
                    url: state.config.saveStateUrl,
                    type: 'POST',
                    async: asyncVal,
                    dataType: 'json',
                    data: {
                        position: positionVal
                    },
                });

                expect(state.storage.setItem.callCount).toBe(1);
                expect($.ajax.callCount).toBe(1);
            });

            it('data contains speed, async is false', function () {
                var asyncVal = false,
                    speedVal = '0.75';

                Initialize.prototype.saveState.call(
                    state,
                    asyncVal,
                    {
                        speed: speedVal
                    }
                );

                expect(state.storage.setItem).toHaveBeenCalledWith(
                    'speed',
                    speedVal,
                    true
                );
                expect($.ajax).toHaveBeenCalledWith({
                    url: state.config.saveStateUrl,
                    type: 'POST',
                    async: asyncVal,
                    dataType: 'json',
                    data: {
                        speed: speedVal
                    },
                });

                expect(state.storage.setItem.callCount).toBe(1);
                expect($.ajax.callCount).toBe(1);
            });

            it('data contains position, async is true', function () {
                var asyncVal = true,
                    positionVal = 3.1241;

                Initialize.prototype.saveState.call(
                    state,
                    asyncVal,
                    {
                        position: positionVal
                    }
                );

                expect(state.storage.setItem).toHaveBeenCalledWith(
                    'position',
                    positionVal,
                    true
                );
                expect($.ajax).toHaveBeenCalledWith({
                    url: state.config.saveStateUrl,
                    type: 'POST',
                    async: asyncVal,
                    dataType: 'json',
                    data: {
                        position: positionVal
                    },
                });

                expect(state.storage.setItem.callCount).toBe(1);
                expect($.ajax.callCount).toBe(1);
            });

            it('data contains speed and position, async is false', function () {
                var asyncVal = false,
                    speedVal = '0.75',
                    positionVal = 3.2345;

                Initialize.prototype.saveState.call(
                    state,
                    asyncVal,
                    {
                        speed: speedVal,
                        position: positionVal
                    }
                );

                expect(state.storage.setItem).toHaveBeenCalledWith(
                    'speed',
                    speedVal,
                    true
                );
                expect(state.storage.setItem).toHaveBeenCalledWith(
                    'position',
                    positionVal,
                    true
                );
                expect($.ajax).toHaveBeenCalledWith({
                    url: state.config.saveStateUrl,
                    type: 'POST',
                    async: asyncVal,
                    dataType: 'json',
                    data: {
                        speed: speedVal,
                        position: positionVal
                    },
                });

                expect(state.storage.setItem.callCount).toBe(2);
                expect($.ajax.callCount).toBe(1);
            });

            it('data contains empty object, async is true', function () {
                var asyncVal = true;

                Initialize.prototype.saveState.call(state, asyncVal, {});

                expect($.ajax).toHaveBeenCalledWith({
                    url: state.config.saveStateUrl,
                    type: 'POST',
                    async: asyncVal,
                    dataType: 'json',
                    data: {},
                });

                expect(state.storage.setItem.callCount).toBe(0);
                expect($.ajax.callCount).toBe(1);
            });
        });
    });

});

}(RequireJS.requirejs, RequireJS.require, RequireJS.define));
