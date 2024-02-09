// import SoccerJersey from './libraries/SoccerJersey.js';
import $ from 'jquery';
import SoccerJersey from 'soccer-jersey';

var CON;;
// var base = 'https://api.sportsbookdemo.com';
var base = location.hostname === 'localhost' ? 'http://localhost:7001' : 'https://api.sportsbookdemo.com';
const _V = {

    RESTSTOP: false,
    lang: 'en',
    SPORTS: false, 
    rest: {
        home: 'https://client.sportsbookdemo.com/index.html',
        socket: window.location.origin + "/",
        base,
        signUp: base + '/Users/Register',
        joinEvent: base + '/Events/join',
        login: base + '/Users/Login',
        sign_verify: base + '/Users/sign_verify',
        newEvent: base + '/Events/create',
    },
    MarketSettings: {
        '1': {
            "mainMarkets": [{ 1: 1 }, { 10: 2 }, { 15: 3 }],
            "handicaps": [{ 1: 3 }, { 10: 3 }],
            "topBottom": [{ 1: 3 }, { 10: 3 }],
            "goalOdds": [{ 1: 3 }, { 10: 3 }]

        }
    },
    async getLang() {
        // console.log(_V.rest.base + "/Langs/getLang/" + _V.lang);
        FUNC.postRequest(_V.rest.base + "/Langs/getLang/" + _V.lang, {}, function (rs, status) {
            window.lang = rs.lang;
            if (SESSION.sessionController('token')) {
                CON = new Socket();
                // FUNC.HOME()

            }
        });
    }
};





class BETS {
    constructor(data) {
        this.ActiveCoupon = data?.ActiveCoupon || [];
        this.betAmount = data?.betAmount || 1;
        this.currentSelections = data?.currentSelections || ["single"];
        this.totalPossibleWinning = 0;
        this.isSystem = false;
        this.betProcessing = false;
        this.reduction = false;
        // this.reduction = [{8: 0.675}, {6.5: 0.7}, {4.75: 0.725}]
        this.totalBets = 0;
    }

    view(req) {
        const self = this;
        var process = {
            showVariants: () => {
                _V._POPUPS.tickets.close();
                var htm = '';
                var types = this.calculateCouponTypes();
                var result = this.calculateBetResults();
                Object.keys(types).forEach(function (key) {
                    if (types[key]) {
                        if (key === "combinations") {
                            Object.keys(types["combinations"]).forEach((comb) => {
                                if (result.details.combi.possibleWin != result.details.combinations[comb].possibleWin) {
                                    var selected = self.currentSelections.indexOf(comb) !== -1 ? 'checked' : '';
                                    htm += '<li><label class="item-checkbox item-checkbox-icon-start item-content"><input class="selectionImp"  type="checkbox" ' + selected + ' name="demo-media-checkbox" value="' + comb + '"><i class="icon icon-checkbox"></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + comb + ' (' + types["combinations"][comb] + ' bets)</div><div class="item-after">' + FUNC.ShowBalance2(result.details.combinations[comb].possibleWin, _V.USER.finance.currency) + '</div></div></div></label></li>';

                                }
                            });
                        } else {

                            var selected = self.currentSelections.indexOf(key) !== -1 ? 'checked' : '';
                            htm += '<li><label class="item-checkbox item-checkbox-icon-start item-content"><input type="checkbox" name="demo-media-checkbox"  ' + selected + ' value="' + key + '" class="selectionImp"><i class="icon icon-checkbox"></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + key + ' (' + types[key] + ' bets)</div><div class="item-after">' + FUNC.ShowBalance2(result.details[key].possibleWin, _V.USER.finance.currency) + '</div></div></div></label></li>';
                        }

                    }
                })
                _V._POPUPS.bet_variant = app.sheet.create({
                    popupPush: true,
                    content: '<div class="sheet-modal h-o"><div class="toolbar"><div class="toolbar-inner" style="background: #ffffff29"><div class="left text-align-center"><h3>System</h3></div><div class="right"><a class="link sheet-close">Close</a></div></div></div><div class="sheet-modal-inner" style="background: #1b1f2f"><div class="page-content"><div class="block"><div class="list list-strong-ios list-outline-ios list-dividers-ios media-list"><ul>' + htm + '</ul></div></div><button style="    margin-bottom: 11px;" class="button mb-3 button-raised button-fill color-theme" onclick="BET.SelectTypeSave();">Select</button></div></div></div>',
                    on: {
                        open: async (popup) => {
                            _V._POPUPS.tickets?.close()
                        },
                        close: async (popup) => {
                            _V._POPUPS.tickets?.open()
                        },
                    },
                });
                _V._POPUPS.bet_variant.open();
            },
            empty: () => {
                self.ActiveCoupon = [];
                self.betAmount = 1;
                self.totalPossibleWinning = 0;
                self.currentSelections = ["single"];
                self.betProcessing = false;
                const elements = document.querySelectorAll('.oddSelected');
                elements.forEach(function (element) {
                    element.classList.remove('oddSelected');
                });
                BET.checkView();
            }
        };
        return process[req] ? process[req]() : false;
    }

    SelectTypeSave(selection, checkboxElement) {
        _V._POPUPS.bet_variant.close();
        const selectionImpCheckboxes = document.querySelectorAll('.selectionImp');
        this.currentSelections = Array.from(selectionImpCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (this.currentSelections.length === 0) {
            this.currentSelections.push("single");
        }
        const typeslipBtn = document.querySelector('.typesliptbtn');
        if (typeslipBtn) {
            if (this.currentSelections.length > 1 || this.currentSelections.includes("system")) {
                typeslipBtn.innerHTML = 'System <i class="bi bi-caret-down-fill"></i>'
            } else {
                typeslipBtn.innerHTML = this.currentSelections[0] + '<i class="bi bi-caret-down-fill"></i>'
            }
        }
        BET.CouponEQUAL();
        this.calculateWinningMoney();

    }

    addMatch(matchId, oddValue, marketId, outComeId, marketName) {
        if (this.isExists(matchId, marketId, outComeId)) {
            this.removeMatch(matchId, outComeId);
            return;
        }
        let match = this.ActiveCoupon.find(m => m.matchId === matchId);
        if (!match) {
            match = {matchId, outComes: []};
            this.ActiveCoupon.push(match);
        }
        if (_V.MATCHES[matchId] && _V.MATCHES[matchId].competition && _V.MATCHES[matchId].competition.competitors) {
            delete _V.MATCHES[matchId].competition.competitors[0].periods;
            delete _V.MATCHES[matchId].competition.competitors[0]._id;
            delete _V.MATCHES[matchId].competition.competitors[1].periods;
            delete _V.MATCHES[matchId].competition.competitors[1]._id;
            delete _V.MATCHES[matchId].competition.competitors[1].jersey;
            delete _V.MATCHES[matchId].competition.competitors[0].jersey;
            match.competition = {
                competitors: _V.MATCHES[matchId].competition.competitors,
                startTime: _V.MATCHES[matchId].info.dates.scheduledTime,
                isLive: _V.MATCHES[matchId].info._is.live,
                sportId: _V.MATCHES[matchId].competition.sportId,
                tid: _V.MATCHES[matchId].competition.tid,
                trId: _V.MATCHES[matchId].competition.trId,
                catId: _V.MATCHES[matchId].competition.catId,

            }
        }

        const outcomeIndex = match.outComes.findIndex(o => o.outComeId === outComeId);
        if (outcomeIndex > -1) {
            match.outComes[outcomeIndex].oddValue = oddValue;
        } else {
            match.outComes.push({outComeId, oddValue, marketId, marketName});
        }
        this.checkView();
    }

    removeMatch(matchId, outComeId) {
        const match = this.ActiveCoupon.find(m => m.matchId === matchId);
        if (match) {
            match.outComes = match.outComes.filter(o => o.outComeId !== outComeId);
            if (match.outComes.length === 0) {
                this.ActiveCoupon = this.ActiveCoupon.filter(m => m.matchId !== matchId);
            }
        }
        this.currentSelections = ["single"];
        this.checkView();
        this.checkMyCoupon();
        this.autoSize();
        this.CouponEQUAL();
    }

    clearBets(){
        this.ActiveCoupon = [];
        this.betAmount = 1;
        this.currentSelections =  ["single"];
        this.totalPossibleWinning = 0;
        this.isSystem = false;
        this.betProcessing = false;
        this.reduction = false;
        // this.reduction = [{8: 0.675}, {6.5: 0.7}, {4.75: 0.725}]
        this.totalBets = 0;
    }

    calculateWinningMoney() {
        const betResults = this.calculateBetResults();
        let totalWinningMoney = 0;
        let totalBets = 0;
        this.currentSelections.forEach(selection => {

            if (betResults.details[selection]) {
                totalWinningMoney += parseFloat(betResults.details[selection].possibleWin);
                totalBets += betResults.details[selection].count;
            } else if (betResults.details.combinations && betResults.details.combinations[selection]) {
                totalBets += betResults.details.combinations[selection].count;
                totalWinningMoney += parseFloat(betResults.details.combinations[selection].possibleWin);
            }
        });
        this.totalBets = totalBets;
        return totalWinningMoney;
    }

    updateMatch(matchId, outComeId, newOddValue) {
        const match = this.ActiveCoupon.find(m => m.matchId === matchId);
        if (match) {
            const outcome = match.outComes.find(o => o.outComeId === outComeId);
            if (outcome) {
                outcome.oddValue = newOddValue;
            }
        }
        this.checkView();
    }

    isExists(matchId, marketId, outComeId) {
        const match = this.ActiveCoupon.find(m => m.matchId === matchId);
        if (match) {
            const outcome = match.outComes.find(o => o.outComeId === outComeId && o.marketId === marketId);
            return outcome !== undefined;
        }
        return false;
    }

    calculateTotal() {
        return this.ActiveCoupon.reduce((total, match) => {
            const matchTotal = match.outComes.reduce((sum, outcome) => sum * outcome.oddValue, 1);
            return total + matchTotal;
        }, 0);
        this.checkView();
    }

    checkView() {

        if (!this.ActiveCoupon) this.ActiveCoupon = [];
        if (this.ActiveCoupon.length > 0) {
            $('.totalCouponAwating').removeClass('kapali').html(BET.ActiveCoupon.length);
            $('.myCoupon').removeClass('kapali').find(".button").html(BET.ActiveCoupon.length);
            $('.ticketIcon').addClass('kapali');
        } else {
            $('.totalCouponAwating').addClass('kapali').html(0);
            $('.myCoupon').addClass('kapali').find(".button").html(0);
            $('.ticketIcon').removeClass('kapali');
        }

        var outcomeElements = document.querySelectorAll('[data-oddkey]');
        outcomeElements.forEach(el => {
            if (!el.classList.contains('locked')) {
                el.classList.remove('oddSelected');
            }
        });

        this.ActiveCoupon.forEach(coupon => {
            coupon.outComes.forEach(outcome => {
                const selector = `[data-matchid="${coupon.matchId}"][data-outcomeid="${outcome.outComeId}"][data-oddmarketid="${outcome.marketId}"]`;
                const matchingElement = document.querySelector(selector);
                if (matchingElement && !matchingElement.classList.contains('locked') && !matchingElement.classList.contains('oddSelected')) {
                    matchingElement.classList.add('oddSelected');
                }
            });
        });
        this.updateTotalPossibleWinning();
        this.calculateWinningMoney()

        JSON.stringify(BET.ActiveCoupon);
    }

    autoSize() {
        var slipHeight = $('#slipBody').height();
        var pheight = slipHeight + 364;
        var sheight = screen.height;
        var nheight = sheight - pheight;
        $('#betSliptApp').css('top', nheight + 'px');
    }

    showBetSlip(open = true) {
        const self = this;
        _V._POPUPS.tickets = _V._POPUPS.tickets || app.sheet.create({
            popupPush: true,
            push: true,
            backdrop: true,
            content: '<div class="sheet-modal h-o"><div class="toolbar" style="background: #5ac8fa"><div class="toolbar-inner"><div class="left text-align-center margin-auto"><h3>BET SLIP</h3></div><div class="right"><a class="link sheet-close"><i class="bi bi-x-lg"></i></a></div></div></div><div class="sheet-modal-inner" style="background: #3c63e2e8"><div class="page-content"><div class="block betSlipContent m0"></div><button class="placeBetBtn placeBetButton button mb-3 button-raised button-fill color-theme">Place Bet</button></div></div></div>',
            on: {
                open: async (popup) => {
                    this.checkMyCoupon();
                    const placeBetButton = document.querySelector('.placeBetButton');
                    if (placeBetButton) {
                        placeBetButton.addEventListener('click', async function () {
                            if (self.betProcessing) return;
                            self.betProcessing = true;
                            await CON.PlaceBet();
                        });
                    }
                },
                opened: async (popup) => {
                    new Cleave("#stakeInp", {
                        numeral: !0,
                        numeralThousandsGroupStyle: "thousand",
                        numeralPositiveOnly: true,
                        numeralIntegerScale: 6
                    });
                    this.CouponEQUAL()
                },
                close: async (popup) => {
                    // _V._POPUPS.tickets?.open()
                    if (_V._POPUPS?.keyboard) _V._POPUPS?.keyboard?.close();
                },
            },
        })
        if (open) _V._POPUPS.tickets.open(); else _V._POPUPS.tickets.close();

    }

    checkMyCoupon() {
        if (this.ActiveCoupon.length > 0) {
            var td = '';

            this.ActiveCoupon.forEach(function (bet, i) {
                bet.outComes.forEach(function (odd, k) {
                    td += '<div class="col-100 medium-50"><div class="card no-radius betrow"><div class="card-content card-content-padding"><div class=row><div class="align-self-center col"><p class="no-margin-bottom"><h5>' + FUNC.MarketName(odd.marketName) + ' : ' + FUNC.M(odd.marketId, odd.outComeId) + '</h5> <small class="font13 text-secondary">' + _V.MATCHES[bet.matchId].competition.competitors[0].name + ' - ' + _V.MATCHES[bet.matchId].competition.competitors[1].name + '</small> <br>   <small class="size-12 text-secondary betslip_ration_bottomlimit">1-3000 CHF</small></div><div class="align-self-center col-auto no-padding-left"><span class="betslip_ration">' + odd.oddValue + '</span> <i class="bi bi-x-circle text-color-gray" onclick="BET.removeMatch(\'' + bet.matchId + '\',\'' + odd.outComeId + '\')"></i></div></div></div></div></div>';
                })
            })
            $('.betSlipContent').html('<div class="row betsliptabs" style="background: #314fb1 !important"><div class="col"><button class="typesliptbtn button btn-sm button-outline button-raised " onclick="BET.view(\'showVariants\')">Single <i class="bi bi-caret-down-fill"></i></button></div><div class="col-auto align-items-center margin-auto"><button class="button button-28 button-outline button-raised color-white" ><i class="bi bi-trash"></i></button></div> </div><div id="slipBody" class="">' + td + ' </div>' +
                '<div class="betslip_footer"><div style="margin: 0px;" class="list list-dividers-ios list-outline-ios list-strong-ios media-list"><ul><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Total Rates</div><div class="item-after total_coupon_rate" data-total-rate="">##</div></div></div></a></li><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Number of Bets</div><div class="item-after co_numberbets" data-total-rate="">##</div></div></div></a></li><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Bonus %5</div><div class="item-after co_bonus" >##</div></div></div></a></li> ' +
                '<li class="item-content item-input stakeCmnt"><div class="co_stli item-media"><span class="co_numberbets">0</span>x</div><div class="item-inner stake-per-bate" onclick="BET.Keyboard()"><div class="item-title item-label">Stake per bet</div><div class="item-input-wrap stls"><input type="text" placeholder="€' + this.betAmount + '" id="stakeInp" onkeyup="BET.changeStake(this.value)" class="stakeInp"><span class="input-clear-button"></span></div></div>    <div class="item-inner stake-per-bate" onclick="BET.Keyboard()"><div class="item-title item-label">Stake per bet</div><div class="item-input-wrap stls"><input type="text" placeholder="€' + this.betAmount + '" id="stakeInpAll" onkeyup="BET.changeStake(this.value)" class="stakeInpAll"><span class="input-clear-button"></span></div></div>    <div class="item-inner possinbg text-align-right"><div class="item-title item-label">Poss. Winnings</div><div class="item-input-wrap possibleWinning">##</span></div></div></li> </ul></div></div>');

            $('.placeBetBtn').removeClass('kapali');

        } else {
            $('.betSlipContent').html('<div class="noBetScreen"><p><center><img src="assets/img/empty.svg" alt=""> <br><p style="color:#ffffff8a;padding:20px">**No bets selected yet. Click on the respective odds to select the bets</p> </center></p></div>');
            $('.placeBetBtn').addClass('kapali');
        }
    }

    Keyboard() {
        _V._POPUPS.keyboard = _V._POPUPS.keyboard || app.sheet.create({
            on: {
                open: async (popup) => {


                    var f_key = 0;
                    $('div.keyboard-number ul li a').click(function () {
                        var val = $(this).attr('data-val');
                        var current = $('div.keyboard-header span.amount').html();

                        if (current.length <= 9) {
                            if (val == 'C') {
                                if (current.length > 1) {
                                    var new_c = current.slice(0, -1);
                                    $('div.keyboard-header span.amount').html(new_c);

                                } else {
                                    $('div.keyboard-header span.amount').html(0);
                                }
                                return false;
                            }

                            if (f_key == 0 || current == 0) {
                                $('div.keyboard-header span.amount').html(val);
                                f_key++;
                            } else {
                                $('div.keyboard-header span.amount').append(val);
                            }
                        }

                    });

                },
            },
            content: `<div class="sheet-modal keyboard-wrap">
                        <div class="toolbar">
                            <div class="toolbar-inner">
                                <div class="keyboard-header clear">
                                    <div class="left">
                                        <p class="p-0 m-0 text">Toplam Bahis </p>
                                        <span class="currency">€</span>
                                        <span class="amount" contenteditable="false">5</span>
                                    </div>
                                    <div class="right">
                                        <p class="p-0 m-0 text">Muhtemel Kazanç </p>
                                        <span class="currency">€</span>
                                        <span class="amount" contenteditable="false">5</span>
                                    </div>   
                                </div>      
                            </div>
                        </div>
                        <div class="sheet-modal-inner">
                            <div class="page-content">
                                <div class="block">
                                    <div class="keyboard-number">
                                        <ul class="p-0">
                                            <li>
                                                <a data-val="1" href="javascript:;">1</a>
                                            </li>
                                            <li>
                                                <a data-val="2" href="javascript:;">2</a>
                                            </li>
                                            <li>
                                                <a data-val="3" href="javascript:;">3</a>
                                            </li>
                                            <li>
                                                <a data-val="4" href="javascript:;">4</a>
                                            </li>
                                            <li>
                                                <a data-val="5" href="javascript:;">5</a>
                                            </li>
                                            <li>
                                                <a data-val="6" href="javascript:;">6</a>
                                            </li>
                                            <li>
                                                <a data-val="7" href="javascript:;">7</a>
                                            </li>
                                            <li>
                                                <a data-val="8" href="javascript:;">8</a>
                                            </li>
                                            <li>
                                                <a data-val="9" href="javascript:;">9</a>
                                            </li>
                                            <li>
                                                <a data-val="," href="javascript:;">,</a>
                                            </li>
                                            <li>
                                                <a data-val="0" href="javascript:;">0</a>
                                            </li>
                                            <li>
                                                <a data-val="C" href="javascript:;">C</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <a href="" onclick="_V._POPUPS.keyboard.close()" style="margin-top: 10px" class="button button-large button-raised button-fill color-theme">CONFIRM</a>
                                </div>
                            </div>
                        </div>
                    </div>`
        });
        _V._POPUPS.keyboard.open();

    }

    CouponEQUAL() {

        $('.total_coupon_rate').html(this.calculateTotalRates());
        $('.co_bonus').html("0.00");
        $('.co_numberbets').html(this.totalBets);
        $('.stakeInp').val((this.betAmount).toFixed(2));
        $('.stakeInpAll').val((this.betAmount * this.totalBets).toFixed(2));
        $('.possibleWinning').html(this.calculateWinningMoney().toFixed(2));
    }

    changeStake(amount) {
        const parsedAmount = parseInt(amount, 10);
        if (parsedAmount > 0) {
            this.betAmount = parsedAmount;
        } else {
            this.betAmount = 1;
        }
        this.CouponEQUAL();
    }

    calculateSingle() {
        return parseFloat(this.ActiveCoupon.reduce((total, match) => {
            return total + match.outComes.reduce((sum, outcome) => {
                return sum + (parseFloat(outcome.oddValue) * this.betAmount);
            }, 0);
        }, 0).toFixed(2));
    }

    calculateMultiway() {
        return this.ActiveCoupon.reduce((total, match) => {
            const maxOdd = Math.max(...match.outComes.map(outcome => outcome.oddValue));
            return total * maxOdd;
        }, 1) * this.betAmount;
    }

    calculateMultiwayWin() {
        return this.ActiveCoupon.every(match =>
            match.outComes.some(outcome => outcome.result === "win")
        );
    }

    calculateCombinationWin(combinationType) {
        const combinationSize = parseInt(combinationType.split('/')[0]);
        const combinations = this.calculateCombinations(this.ActiveCoupon, combinationSize);
    
        return combinations.some(combination => {
            return combination.every(match => {
                    return match.outComes.some(outcome => outcome.result === "win")
                }
            );
        });
    }

    calculateSystem() {
        return this.calculateMultiway();
    }

    calculateBet(type) {
        switch (type) {
            case 'single':
                return this.calculateSingle();
            case 'combi':
                return this.calculateMultiway();
            case 'system':
                return this.calculateSystem();
            default:
                return 0;
        }
    }
    
    checkWin(type) {
        switch (type) {
            case 'single':
                return this.checkSingleWin();
            case 'combi':
                return this.calculateMultiwayWin();
            case 'combinations':
                return this.calculateCombinationWin();
            default:
                if (/^\d+\/\d+$/.test(type)) {
                    return this.calculateCombinationWin(type);
                }
                return false;
        }
    }

    checkSingleWin() {
        return this.ActiveCoupon.every(match =>
            match.outComes.every(outcome => outcome?.result?.toLowerCase() === "win")
        );
    }

    checkMultiwayWin() {
        return this.ActiveCoupon.every(match =>
            match.outComes.some(outcome => outcome.result === "win")
        );
    }

    calculateTotalRates(type = "single") {
        let totalRates = 0;
        if (type === 'single') {
            totalRates = this.ActiveCoupon.reduce((total, match) => {
                return total + match.outComes.reduce((sum, outcome) => sum + parseFloat(outcome.oddValue), 0);
            }, 0);
        } else if (type === 'combi') {
            totalRates = this.ActiveCoupon.reduce((total, match) => {
                return total * match.outComes.reduce((product, outcome) => product * parseFloat(outcome.oddValue), 1);
            }, 1);
        } else if (type === 'system') {
            totalRates = this.calculateTotalRates('combi');
        }
    
        return totalRates.toFixed(2);
    }

    calculatePossibleWin(type, combinationType) {
        let result = {
            potentialWin: 0,
            sachaCashout: 0,
            alternativeCashout: 0
        };
    
        if (type === 'single') {
            result.potentialWin = this.calculateSingle();
        } else if (type === 'combi') {
            result.potentialWin = this.calculateMultiway();
        } else if (type === 'combinations') {
            result.potentialWin = this.calculateCombinationWins(combinationType);
        }
    
        result.sachaCashout = this.calculateSachaCashout(type, result.potentialWin);
        result.alternativeCashout = this.calculateAlternativeCashout(type, result.potentialWin);
    
        return result;
    }

    calculateCombinations(matches, k) {
        let combinations = [];
        const combine = (start, chosenMatches) => {
            if (chosenMatches.length === k) {
                combinations.push(chosenMatches);
                return;
            }
            for (let i = start; i < matches.length; i++) {
                combine(i + 1, chosenMatches.concat(matches[i]));
            }
        };
        combine(0, []);
        return combinations;
    }

    calculateCombinationWins(combinationType) {
        let totalWin = 0;
        const combinationSize = parseInt(combinationType.split('/')[0]);
        const nonBankoMatches = this.ActiveCoupon.filter(match => !match.isBanko);
        const bankoOdds = this.ActiveCoupon
            .filter(match => match.isBanko)
            .reduce((product, match) => product * Math.max(...match.outComes.map(outcome => outcome.oddValue)), 1);
        const combinations = this.calculateCombinations(nonBankoMatches, combinationSize);
        combinations.forEach(combination => {
            let combinationOdds = 1;
            combination.forEach(match => {
                const maxOdd = Math.max(...match.outComes.map(outcome => outcome.oddValue));
                combinationOdds *= maxOdd;
            });
            totalWin += combinationOdds;
        });
        return totalWin * bankoOdds * this.betAmount;
    }

    calculateCouponCounts() {
        const couponCounts = {
            single: 0,
            multi: 0,
            system: 0
        };
    
        // Single kupon sayÄ±sÄ±nÄ± hesapla
        this.ActiveCoupon.forEach(match => {
            couponCounts.single += match.outComes.length;
        });
    
    
        if (this.ActiveCoupon.length > 0 && this.ActiveCoupon.every(match => match.outComes.length > 0)) {
            couponCounts.multi = 1;
        }
    
        // System kupon sayÄ±sÄ±, daha karmaÅŸÄ±k bir hesaplama gerektirir
        // Basit bir Ã¶rnek olarak, her maÃ§ iÃ§in en az iki outcome varsa bir sistem kuponu oluÅŸturulabilir
        if (this.ActiveCoupon.every(match => match.outComes.length >= 2)) {
            couponCounts.system = this.calculateSystemCouponCount();
        }
    
        return couponCounts;
    }

    calculateSystemCouponCount() {
        return this.ActiveCoupon.reduce((count, match) => count * match.outComes.length, 1);
    }

    calculateCouponTypes() {
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        const calculateCombinations = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
    
        const totalMatches = this.ActiveCoupon.reduce((total, match) => total + match.outComes.length, 0);
        const bankoMatches = this.ActiveCoupon.filter(match => match.isBanko).length;
        const nonBankoMatches = this.ActiveCoupon.length - bankoMatches;
        const couponTypes = {
            combi: this.ActiveCoupon.length > 0 ? 1 : 0,
            single: totalMatches,
            combinations: {}
        };
        for (let k = 2; k <= nonBankoMatches + bankoMatches; k++) {
            const combinationsWithoutBanko = calculateCombinations(nonBankoMatches, k - bankoMatches);
            couponTypes.combinations[`${k}/${this.ActiveCoupon.length}`] = combinationsWithoutBanko;
        }
    
        return couponTypes;
    }

    calculateBetResults() {
    
        const results = {
            totalBets: 0,
            totalWin: 0,
            totalLost: 0,
            details: {},
            newCashout: 0
        };
    
        results.details.single = {
            count: this.calculateCouponCounts().single,
            possibleWin: this.calculateSingle(),
            cashout: this.calculateSachaCashout('single', this.calculateSingle()),
            isWin: this.checkSingleWin()
        };
        results.totalBets += results.details.single.count;
        if (results.details.single.isWin) {
            results.totalWin += results.details.single.possibleWin;
        } else {
            results.totalLost += this.betAmount * results.details.single.count;
        }
    
        results.details.combi = {
            count: this.calculateCouponCounts().multi,
            possibleWin: this.calculateMultiway(),
            cashout: this.calculateSachaCashout('combi', this.calculateMultiway()),
            isWin: this.calculateMultiwayWin()
        };
        results.totalBets += results.details.combi.count;
        if (results.details.combi.isWin) {
            results.totalWin += results.details.combi.possibleWin;
        } else {
            results.totalLost += this.betAmount * results.details.combi.count;
        }
        const couponTypes = this.calculateCouponTypes();
        results.details.combinations = {};
        Object.keys(couponTypes.combinations).forEach(combinationType => {
            const possibleWin = this.calculateCombinationWins(combinationType);
            results.details.combinations[combinationType] = {
                count: couponTypes.combinations[combinationType],
                possibleWin: possibleWin,
                cashout: this.calculateSachaCashout('combinations', possibleWin),
                isWin: this.checkWin(combinationType)
            };
            if (results.details.combi.possibleWin !== possibleWin) results.totalBets += results.details.combinations[combinationType].count;
            if (results.details.combinations[combinationType].isWin) {
                results.totalWin += possibleWin;
            } else {
                if (results.details.combi.possibleWin !== possibleWin) results.totalLost += this.betAmount * results.details.combinations[combinationType].count;
    
            }
        });
        results.newCashout = parseFloat(this.newCashout());
    
        return results;
    }

    calculateDetailForSelection(selection) {
        return {
            count: this.calculateCouponCounts()[selection],
            possibleWin: this.calculateBet(selection),
            cashout: this.calculateSachaCashout(selection, this.calculateBet(selection)),
            isWin: this.checkWin(selection)
        };
    }

    calculateDetailForCombination(combinationType) {
        const possibleWin = this.calculateCombinationWins(combinationType);
        return {
            count: this.calculateCouponTypes().combinations[combinationType],
            possibleWin: possibleWin,
            cashout: this.calculateSachaCashout('combinations', possibleWin),
            isWin: this.checkWin(combinationType)
        };
    }

    calculateAlternativeCashout(type, potentialWin) {
        const alternativeFactor = 0.8;
        return potentialWin * alternativeFactor
    }

    calculateSachaCashout(type, potentialWin) {
        // const potentialWin = this.calculatePossibleWin(type).potentialWin;
        const totalOdds = this.calculateTotalRates(type) || 0;
        const reduction = 0.9;
    
        const cashout = potentialWin * (reduction / parseFloat(totalOdds));
        return parseFloat(cashout.toFixed(2));
    }

    calculateTicketSummary() {
        const betResults = this.calculateBetResults();
        let bets = 0;
        let ticketSize = 0;
        let ticketAmount = 0;
        let ticketWins = 0;
        let ticketLoses = 0;
        let ticketPossibleWin = 0;
    
     
        this.currentSelections.forEach(selection => {
            if (betResults.details[selection]) {
                const detail = betResults.details[selection];
                bets += detail.count;
                ticketAmount += this.betAmount * detail.count; // Burada gÃ¼ncelleme
                ticketPossibleWin += parseFloat(detail.possibleWin);
                if (detail.isWin) {
                    ticketWins += parseFloat(detail.possibleWin);
                } else {
                    ticketLoses += this.betAmount * detail.count;
                }
            }
    
            if (selection === "combinations") {
                Object.keys(betResults.details.combinations).forEach(combinationType => {
                    const combinationDetail = betResults.details.combinations[combinationType];
                    ticketSize += combinationDetail.count;
                    ticketAmount += this.betAmount * combinationDetail.count; // Burada da gÃ¼ncelleme
                    ticketPossibleWin += parseFloat(combinationDetail.possibleWin);
                    if (combinationDetail.isWin) {
                        ticketWins += parseFloat(combinationDetail.possibleWin);
                    } else {
                        ticketLoses += this.betAmount * combinationDetail.count;
                    }
                });
            }
        });
    
        return {
            bets,
            ticketSize,
            ticketAmount: parseFloat(ticketAmount.toFixed(2)), // Ä°ki ondalÄ±k basamak yuvarlamasÄ±
            ticketWins: parseFloat(ticketWins.toFixed(2)),
            ticketLoses: parseFloat(ticketLoses.toFixed(2)),
            ticketPossibleWin: parseFloat(ticketPossibleWin.toFixed(2))
        };
    }

    encodeActiveCoupon() {
        const jsonString = JSON.stringify(this.ActiveCoupon);
        return jsonString.split('').reduce((acc, char) => {
            const charCode = char.charCodeAt(0);
            return acc + charCode;
        }, '');
    }

    verifyActiveCoupon(encodedData) {
        const originalEncoded = this.encodeActiveCoupon();
        return encodedData === originalEncoded;
    }

    newCashout() {
        let totalCashout = 0;
        for (const match of this.ActiveCoupon) {
            for (const outcome of match.outComes) {
                const reduction = this.getReductionForOdds(outcome.oddValue);
                totalCashout += (outcome.oddValue * this.betAmount) * (reduction / outcome.oddValue);
            }
        }
        return totalCashout;
    }

    calculateTypeCashout(type, stake) {
        const totalOdds = this.calculateTotalRates(type);
        const reduction = this.getReductionForOdds(totalOdds);
        const potentialWin = this.calculatePossibleWin(type).potentialWin;
        // Cashout formÃ¼lÃ¼nÃ¼ uyguluyoruz.
        return (potentialWin * stake) * (reduction / totalOdds);
    }

    getReductionForOdds(oddValue) {
        const reductions = [
            {maxOdd: 8, reduction: 0.675},
            {maxOdd: 6.5, reduction: 0.7},
            {maxOdd: 4.75, reduction: 0.725}
        ];
        const reductionForOdd = reductions.reduce((acc, item) => {
            if (oddValue <= item.maxOdd && (acc === null || item.maxOdd < acc.maxOdd)) {
                return item;
            }
            return acc;
        }, null);
    
        return reductionForOdd ? reductionForOdd.reduction : 0;
    }

    updateTotalPossibleWinning() {
        this.totalPossibleWinning = 0;
        this.currentSelections.forEach(selection => {
            if (selection === 'single' || selection === 'combi' || selection === 'system') {
                this.totalPossibleWinning += this.calculateBet(selection);
            } else if (/^\d+\/\d+$/.test(selection)) {
                this.totalPossibleWinning += this.calculateCombinationWins(selection);
            }
        });
    }

    q() {
        console.log(JSON.stringify(this.calculateBetResults(), null, 2))
    }
}


class V_APP {

    constructor() { }
}

class USERS {
    constructor() {
    }

    async LOGIN(id, pass) {
        if (_V.RESTSTOP) return;


        // return FUNC.LOADING(true);
        // var pass = $('[name=password]').val();
        // var id = $('[name=email]').val() + "".trim();

        if (id && pass) {

            // $('body').append('<div class="sign-in-loader"><div class="spinner"></div></div>');

            return await fetch(_V.rest.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'email': id, 'password': pass })
            })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(rs => {
                    if (rs.token) {
                        SESSION.delSession('token');
                        SESSION.delSession('AUTH');
                        SESSION.setSession('token', rs.token);

                        setTimeout(() => {
                            // document.location.href = _V.rest.home;
                            document.location.href = '/';
                        }, 2000);


                        // return window.lang.ERROR[response.message];
                    } else {
                        console.log(rs);
                        // FUNC.Message(FUNC.RS(rs.message), {"dir": "top", "type": "Danger"});
                    }
                })
                .catch(error => {
                    // FUNC.LOADING(false);
                    // console.log(error);

                    // return false;

                    error.json().then(response => {
                        switch (error.status) {
                            case 422:
                                // FUNC.Message(lang.ERROR[response.message], {"dir": "top", "type": "Danger"});

                                // document.location.href = '/otp/trustId';
                                document.location.href = '?error=invalid';


                                break;
                            case 401:
                                var payload = { 'email': id, 'password': pass };
                                // app.views.main.router.navigate('/otp/trustId', {
                                //     context: {
                                //         lang: window.lang,
                                //         "data": JSON.stringify(payload)
                                //     }
                                // });

                                document.location.href = '/otp/trustId';
                                break;
                            default:
                                ' app.dialog.alert(window.lang.ERROR[response.message], "");'
                        }
                    });
                });

        } else {
            return 'ERROR';
        }



    };

    LOGOUT() {
        SESSION.delSession('token');
        setTimeout(function () {
            app.dialog.close();
            document.location.href = "./index.html";
        }, 1000);

    };

    SIGNUP() {
        if (_V.RESTSTOP) return;
        if (!document.querySelector('.aggrement').checked) return FUNC.Message(lang.ERROR.youMissedAgg);
        FUNC.LOADING(true);
        app.request.promise.postJSON(_V.rest.signUp, {
            'name': $('[name=name]').val(),
            'email': $('input.register[name=email]').val(),
            'password': $('input.register[name=password]').val(),
            'gender': _V.genderSelected,
            'aggrement': document.querySelector('.aggrement').checked,
            'lang': lang.DEFAULTS.code,
            'number': document.querySelector('[name=number]').value.trim(),
            'prefix': FUNC.selected('[name=prefix]').value,
            'country': FUNC.selected('[name=prefix]').dataset.countrycode,
            'refCode': document.querySelector('[name=refcode]').value.trim()
        }).then(rs => {
            FUNC.LOADING(false);
            switch (rs.status) {
                case 200:
                    rs = rs.data;
                    app.views.main.router.navigate('/otp/register', {
                        context: {
                            lang: window.lang,
                            "data": JSON.stringify(rs)
                        }
                    });
                    break;
                default:

                    break;
            }

        }).catch(error => {
            FUNC.LOADING(false);
            var msg = JSON.parse(error.xhr.response);
            app.dialog.close();
            app.dialog.alert(lang.ERROR[msg.message], "");
            console.log(error)
        });

    }

    OTP(reqid) {
        switch (reqid) {
            case 'close':
                setTimeout(function () {
                    app.dialog.close();
                    //  $('.back').click();
                    clearInterval(_V.OTP_INTER);
                    _V.OTP_INTER = false;
                    _V._OTP?.destroy();
                }, 300);
                break;
            case 'ok':
                app.dialog.close();
                clearInterval(_V.OTP_INTER);
                _V._OTP.$el[0].innerHTML = '<i class="fas fa-check-circle otp_ok" ></i>';
                $('.otp_confirm').removeAttr('onClick').addClass('kapali')
                $('.closedBtns').removeClass('kapali')
                $('.enter_title').html(window.lang.app.authOke);
                $('.optUl').html('<div class="item-inner otp_details">' + window.lang.app.auths + '</div>');
                break;
            case 'register':
                var code = document.querySelector('[name=verify_code]').value;
                var otp_data = document.querySelector('[name=otp_data]').value;
                var dt = JSON.parse(otp_data);
                if (code.length === 6) {
                    FUNC.LOADING(true, "Please Stand By");
                    app.request.promise.postJSON(_V.rest.sign_verify, {
                        'code': code,
                        'data': otp_data,
                        'email': dt.email,
                        'number': dt.number,
                        'hash': dt.hash,
                        'prefix': dt.prefix
                    }).then(rs => {
                        if (rs.status === 200) {
                            app.dialog.alert(window.lang.REGISTER.successFullLogin, "");
                            SESSION.delSession('token');
                            SESSION.delSession('AUTH');
                            SESSION.setSession('token', rs.data.token);
                            if (rs.data.token) {
                                SESSION.setSession('token', rs.data.token);
                                setTimeout(function () {
                                    app.dialog.close();
                                    document.location.href = "/dashboard"
                                }, 2000)

                            } else {
                                setTimeout(function () {
                                    app.dialog.close();
                                    app.views.main.router.navigate('/signin/');
                                }, 2000)
                            }
                        } else app.dialog.alert(window.lang.ERROR.err_07, "")
                        app.dialog.close();
                    }, function (rs) {
                        var err = JSON.parse(rs.xhr.response);
                        if (window.lang.REGISTER[err.message]) app.dialog.alert(window.lang.REGISTER[err.message], ""); else {
                            app.dialog.alert(err.message, "")
                        }
                        // app.dialog.close();
                        FUNC.LOADING(false);

                    })
                } else app.dialog.alert(window.lang.ERROR.missingCode, window.lang.general.err0r);
                break;
            case 'phone_change':
                var code = document.querySelector('[name=verify_code]').value;
                var otp_data = document.querySelector('[name=otp_data]').value;
                var dt = JSON.parse(otp_data);
                dt['code'] = code;
                if (code.length === 6) {
                    FUNC.LOADING(window.lang.DEFAULTS.pleaseStandBy);
                    CON.PROFILE_SAVE({ 'req': 'phone_update', 'data': dt }).then(response => {
                        if (response.err) {
                            app.dialog.close();
                            app.dialog.alert(response.err, "");
                        } else if (response.success) {
                            USER.OTP('ok');
                            app.dialog.alert(window.lang.ERROR.successPHChange, window.lang.general.successFull);
                        } else {
                            app.dialog.alert(window.lang.ERROR.systemHalt, window.lang.general.err0r);
                        }
                    });
                } else app.dialog.alert(window.lang.ERROR.missingCode, window.lang.general.err0r);
                break;
            case 'reset_pass':
                FUNC.LOADING(window.lang.DEFAULTS.pleaseStandBy);
                var code = document.querySelector('[name=verify_code]').value;
                var otp_data = document.querySelector('[name=otp_data]').value;
                var dt = JSON.parse(otp_data);
                dt['code'] = code;
                var data = {
                    'code': code,
                    'data': otp_data,
                    'newPass': document.querySelector("[name=new_password]").value,
                    'hash': dt.hash,
                    'email': dt.email,
                    'number': dt.number,
                    'check': true,
                    'prefix': dt.prefix
                };
                app.request.promise.postJSON('users/reset_pass', data).then(rs => {
                    if (rs.status === 200) {
                        app.dialog.close();
                        app.dialog.alert(window.lang.reset.pass_changed, "");
                        this.OTP('ok');
                    } else {
                        app.dialog.close();
                        app.dialog.alert(window.lang.reset[rs.message], "");
                    }
                }, function (err) {
                    app.dialog.close();
                    app.dialog.alert(window.lang.reset[JSON.parse(err.xhr.response).message], "");
                });
                break;
            case 'trustId':
                var code = document.querySelector('[name=verify_code]').value;
                var otp_data = document.querySelector('[name=otp_data]').value;
                var id = $('[name=email]').val();
                var pass = $('[name=password]').val();
                var dt = JSON.parse(otp_data);
                dt['code'] = code;
                if (code.length === 6) {
                    FUNC.LOADING(window.lang.DEFAULTS.pleaseStandBy);
                }
                app.request.promise.postJSON(_V.rest.login, dt).then(rs => {
                    rs = rs.data;

                    if (rs.success && rs.token) {
                        //SESSION.setSession('USER', {'id': id, 'pass': pass});
                        SESSION.delSession('token');
                        SESSION.delSession('AUTH');
                        SESSION.setSession('token', rs.token);

                        console.log(lang.LOGIN.successFullLogin);
                        FUNC.Message(lang.LOGIN.successFullLogin, { "dir": "top", "type": "Success" });
                        setTimeout(() => {
                            document.location.href = "/dashboard/";
                        }, 3000);

                    }
                }).catch(error => {
                    FUNC.LOADING(false);
                    var response = JSON.parse(error.xhr.response);
                    FUNC.Message(lang.ERROR[response.message], { "dir": "top", "type": "Warning" });
                });
                break;
            case 'set_email':
                var code = document.querySelector('[name=verify_code]').value;
                var otp_data = JSON.parse(document.querySelector('[name=otp_data]').value);
                otp_data["code"] = code;
                app.dialog.preloader();
                FUNC.postRequest(_V.rest.base + "/Users/email.reset/", otp_data, function (rs, status) {
                    console.log(rs)
                    app.dialog.close();
                    if (status === 200) {
                        FUNC.goBack()
                        clearInterval(_V.OTP_INTER);
                        _V._OTP.destroy();
                        _V.USER.personal.email = otp_data.email;
                        $('.emailafterupdate').html(otp_data.email);
                        setTimeout(function () {
                            FUNC.goBack()
                        }, 300)
                        FUNC.theMessage(lang.ERROR[rs.message], "success");
                    } else {
                        app.dialog.alert(lang.ERROR[rs.message], "")
                    }
                });

                break;
        }
    }

    getInfo() {
        return _V.USER;
    }

    langName() {
        return _V.LANG_LIST[_V.USER.locations.lang.toLowerCase()].name
    }

    SLOTEXIT(slotId) {
        FUNC.postRequest(_V.rest.base + "/Slots/slot.exit", { slotId }, function (rs, status) {

        });
    }

    ShortInfo() {
        const methods = {
            lastPasswordUpdate: function () {
                return _V.USER.dates.lastProcessTime ? "Updated : " + FUNC.timeZone(_V.USER.dates.lastProcessTime, _V.USER.locations.timezone, true) : "You can set your password";
            }
        };
        return methods;
    }
}



class FUNCS {

    async postRequest(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + SESSION.getSession('token').token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var status = xhr.status;
                callback(JSON.parse(xhr.response), status);
            }
        };

        xhr.send(JSON.stringify(data));

    }

    async slotsLoad(search = false, data = false) {
        var i = 0;
        var htm = '';
        if (search === false) {
            await FUNC.slotInner(_V.RGAMES);
        } else {
            for (let v of data) {
                i++;
                htm += await FUNC.processGame(v, i % 2 === 1);
            }
            $(".SLOT_SEARCH_RESULTS").html(htm);
        }

    }

    async slotInner(data, append = false) {
        $('.slotloader').remove();
        var htm = '';
        var i = 0;
        if (data) {
            for (let v of data) {
                i++;
                htm += await FUNC.processGame(v, i % 2 === 1);
            }
            var loader = ' <div class="col-100 slotloader mt10" style="text-align: center"><div class="preloader"><span class="preloader-inner"> <span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span><span class="preloader-inner-line"></span> </span></div></div>';
            if (append === false) $(".SLOT_GAMES").html(htm + loader); else $(".SLOT_GAMES").append(htm + loader);
        }
    }

    M(marketId, oddId) {
        return _V.MARKET_KEYS && _V.MARKET_KEYS[marketId + "_" + oddId] ? _V.MARKET_KEYS[marketId + "_" + oddId] : oddId;
    }

    MarketName(name) {
        return lang?.outComeMarkets?.[name] ? lang?.outComeMarkets?.[name] : name
    }


    homeMatches(list, sports) {
 

        const find1x2Odds = async (matchId) => {
            return _V.MATCHES[matchId].odds.filter(item =>
                item.marketId === 1
            );
        }

        _V.MATCHES = list;
        _V.SPORTS = sports;

        // return list;
        return Object.values(_V.MATCHES).filter(async match => {
            if (match.markets.find(m => m.marketId == 1)) {

                // SAAT VE TARİH AYARLA
                match.date = this.BookmakerTime(match.info.dates.scheduledTime);
                match.startTime = match.competition.startTime;

                // FORMA OLUŞTUR
                match.jerseys = [(this.jersey('#f90')), (this.jersey(match.competition?.competitors[1]?.jersey?.[0].base,"away"))];

                // MARKETID 1 YOKSA LİSTEDEN ÇIKAR
                match.market1 = match.markets.find(m => m.marketId == 1);

                // match.mains = Object.values(_V.MarketSettings[match.competition.sportId]['mainMarkets']).map(m => Object.keys(m)[0]);
                return true; // Koşulu sağlayan maçları tut
            }
            return false; // Koşulu sağlamayan maçları filtrele
        });
    }

    ticketMutation (list){
        
        for (const key in list) {

            const date = new Date(list[key].dates.create);

            list[key].dates.create1 = date.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });

            list[key].dates.create2 = date.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }); 

        }

        return list;

          
    }

    async CONNECTED(retry = 0) {
        retry++;
        if (_V.USER) {
            // new FUNCS().LOADING(false);
            var htm = '';

            // $('.mainSports').html(htm);

            return true;
        } else {
            if (retry > 10) {
                location.reload();
            }
            return setTimeout(async function () {
                await new FUNCS().CONNECTED(retry);
            }, (100 * retry))
        }
    }

    jersey(data, select = 'home', sportIds = 1) {
        return SoccerJersey.draw({  
            shirtText: "",
            shirtColor: data,
            sleeveColor: "#fff",
            shirtStyle: "plain",
            shirtStyleColor: "#dc0001",
            textColor: "#fff",
          })
    }

    BookmakerTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        let dateStr = 'Today';
        if (isToday) {
            dateStr = "Today";
        } else if (now.getTime() < date.getTime() && date.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
            dateStr = dayOfWeek[date.getDay()];
        } else {
            // dateStr = date.toISOString().split('T')[0];
        }
        return { 'hour': `${hours}:${minutes}`, 'date': dateStr };
    }

    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

class SESSIONS {
    constructor() {
    }

    setSession(name, value, exp = (15552000)) {
        if (typeof (Storage) !== "undefined") {
            FUNC.setCookie('token', value, 1);
            return sessionStorage[name] = JSON.stringify({ [name]: value, 'expires': new Date().getTime() + exp * 1000 });
        } else return false;
    };

    getSession(name) {
        var token = JSON.parse(sessionStorage.getItem(name));
        if (!token) return false;
        if (!FUNC.getCookie('token')) FUNC.setCookie('token', token.token, 1);
        return token;
    };

    delSession(name) {
        return sessionStorage.removeItem(name);
    };

    sessionController(sessName) {
        if (JSON.parse(sessionStorage.getItem(sessName))) {
            var ses = JSON.parse(sessionStorage.getItem(sessName));
            if (ses.expires < new Date().getTime()) {
                sessionStorage.removeItem(sessName);
                return false;
            } else return true
        } else return false;
    };

}

class Socket {
    #socket;


    constructor() {
        const token = true
        if (this.isConnected) return;
        this.#socket = io.connect(location.hostname === 'localhost' ? 'ws://localhost' : "wss://client.sportsbookdemo.com", {
            reconnection: false,
            pingInterval: 25000,
            pingTimeout: 60000,
            forceNew: true,
            transports: ['websocket'],
            secure: true,
            auth: { 'token': SESSION.getSession('token').token, 'agent': navigator.userAgent },
            'lang': 'en',
            query: { 'client': "ADMIN" }

        }).on('connect', async function (S) {

            this.isConnected = true;
            $('.loader-wrap').hide();
            const conn = await FUNC.CONNECTED();

            $('.page.page-home').removeClass('kapali');
            setTimeout(function () {
                // console.clear();
            }, 100)
        })
            .on('DC', function () {
                // SESSION.delSession('token');
                // location.reload()
            }).on("SETTINGS", function (rs) {
                _V.SETTINGS = rs;

            }).on("_USERINFO", function (USER) {
                _V.USER = USER;
                //  FUNC.USERLESS();
            }).on('TICKETS', async function (rs) {
                _V.TICKETS = rs;
            }).on('RGAMES', async function (rs) {
                _V.RGAMES = rs;
            })

    }


    async PlaceBet() {
        try {
            BET.betProcessing = true;
            // const result = await FUNC.FlashLoading();
            const result = 1;
            if (result) {
                const coupon = {
                    ActiveCoupon: BET.ActiveCoupon,
                    betAmount: BET.betAmount,
                    typeSection: BET.currentSelections
                };
                this.#socket.emit("placeBet", { BET, hash: BET.encodeActiveCoupon() }, function (rs) {
                    if (rs === true) {
                        BET.showBetSlip(false);
                        BET.view("empty");
                        FUNC.theMessage("Your bet successfully placed", "success")
                    } else {
                        app.dialog.alert("Odds changed we need second confirmation", "Opps");
                    }
                });
            }
        } catch (error) {
            console.error("An error occurred during FlashLoading:", error);
        }
    }

    getActions() {
        var result = 'no-data';
        this.#socket.emit("GET_ACTIONS", function (rs) {
            if (rs.length > 0) {
                result = '';
                rs.forEach(function (log, index) {
                    result += ' <div class="row border-bottom padding-half"> <div class="col-auto"> <span class="button button-fill button-28 color-theme button-raised"> <i class="f20 ' + _V.ActionIcons[log.detail] + '"></i> </span> </div><div class="col align-self-center no-padding-left"> <p class="no-margin-bottom size-12"><span class="text-color-theme fw-medium">' + log.date + '</span> </p><p><small class="size-12 text-muted">' + LANG.actions(log.detail, log.params) + '</small></p></div></div>'
                });
                $('.MYLOGS').html(result).removeClass('align-self-center').removeClass('text-align-center');
                FUNC.LOADING(false);
            } else {

                setTimeout(function () {
                    FUNC.goBack();
                    FUNC.LOADING(false);
                }, 1000)
                setTimeout(function () {
                    app.dialog.alert(lang.ERROR.no_data, "");
                }, 1400)
            }
        });
    }

    getDeposits() {
        this.#socket.emit("GET_DEPOSITS", function (rs) {
            FUNC.GET_DEPOSITS(rs);
        });
    }

    getWithdraws() {
        this.#socket.emit("MY_WITHDRAWS", function (rs) {
            FUNC.GET_WITHDRAWS(rs);
        });
    }

    slotSearch(value) {
        if (value.length > 0) {
            this.#socket.emit("slotSearch", value, function (rs) {
                if (rs && rs.length > 0) {
                    $('.SLOT_SEARCH_RESULTS').removeClass('kapali');
                    $('.SLOT_GAMES').addClass('kapali');
                    FUNC.slotsLoad(true, rs);
                } else {
                    $('.SLOT_SEARCH_RESULTS').html("Any game not found");
                }
            });
        } else {
            $('.SLOT_SEARCH_RESULTS').addClass('kapali');
            $('.SLOT_GAMES').removeClass('kapali');
        }

    }

    loadSlotMore() {
        this.#socket.emit("loadSlotMore", { 'page': _V.slot_page }, function (rs) {
            if (rs.length > 0) {
                FUNC.slotInner(rs, true);
                _V.slot_page += 1;
            } else {
                _V.slot_page = false;
                $('.slotloader').remove();
            }

        })
    }

    requestMoney(value, proc = "deposit") {
        if (parseInt(value) <= 0) {
            FUNC.theMessage("Insufficient funds", "error");
            app.dialog.close();
            return;
        }
        FUNC.LOADING(true);
        this.#socket.emit("MONEY_REQUEST", { "value": value, "proc": proc }, function (rs) {
            FUNC.goBack()
            FUNC.LOADING(false);

            app.dialog.close();
        })
    }
}


const SESSION = new SESSIONS();
const FUNC = new FUNCS();
const VAPP = new V_APP();
const USER = new USERS();
const BET = new BETS();

export { SESSION, BET, VAPP, USER, FUNC, CON, _V, Socket };

