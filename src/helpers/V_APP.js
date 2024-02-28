// import SoccerJersey from './libraries/SoccerJersey.js';
import $ from 'jquery';
import SoccerJersey from 'soccer-jersey';

var CON;;
// var base = 'https://api.sportsbookdemo.com';
var base = 'https://api.sportsbookdemo.com';
var new_base = 'https://feed.betsignals.io';
var socket_base = "wss://client.sportsbookdemo.com"
const _V = {

    RESTSTOP: false,
    lang: 'en',
    SPORTS: false, 
    Cashout: false,
    rest: {
        home: 'https://client.sportsbookdemo.com/index.html',
        socket: window.location.origin + "/",
        base,
        new_base,
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
        this.totalBets = 0;
        this.bankos = false;
    }


    clearBets(){
        this.ActiveCoupon = [];
        this.betAmount = 1;
        this.currentSelections =  ["single"];
        this.totalPossibleWinning = 0;
        this.isSystem = false;
        this.betProcessing = false;
        this.reduction = false;
        this.totalBets = 0;
        this.bankos = false;
    }

    view(req) {
        const self = this;
        var process = {
            showVariants: () => {
                _V._POPUPS.tickets.close();
                var htm = '';
                var types = this.calculateCouponTypes();
                var result = this.calculateBetResults();
                const hasMultipleOutcomes = this.ActiveCoupon.some(match => match.outComes.length > 1);
                const maxSelections = [];
                Object.keys(types).forEach(function (key) {
                    if (types[key]) {
                        if (key === "combinations") {
                            Object.keys(types["combinations"]).forEach((comb) => {
                                console.log(comb)
                                if (result.details.combinations[comb]?.possibleWin && result.details.combi.possibleWin !== result.details.combinations[comb].possibleWin && result.details.combinations[comb]?.possibleWin > 0) {
                                    if (maxSelections.indexOf(comb) === -1) maxSelections.push(comb);
                                    var selected = self.currentSelections.indexOf(comb) !== -1 ? 'checked' : '';
                                    htm += '<li><label class="item-checkbox item-checkbox-icon-start item-content"><input class="selectionImp"  type="checkbox" ' + selected + ' name="demo-media-checkbox" value="' + comb + '"><i class="icon icon-checkbox"></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + comb + ' (' + result.details["combinations"][comb].count + ' bets)</div><div class="item-after">' + FUNC.ShowBalance2(result.details.combinations[comb].possibleWin, _V.USER.finance.currency) + '</div></div></div></label></li>';
                                } else if (maxSelections.indexOf(comb) !== -1) {
                                    const index = maxSelections.indexOf(comb);
                                    if (index !== -1) {
                                        maxSelections.splice(index, 1);
                                    }
                                }
                            });
                        } else {
                            if (key === "combi" && hasMultipleOutcomes) return;
                            var selected = self.currentSelections.indexOf(key) !== -1 ? 'checked' : '';
                            htm += '<li><label class="item-checkbox item-checkbox-icon-start item-content"><input type="checkbox" name="demo-media-checkbox"  ' + selected + ' value="' + key + '" class="selectionImp"><i class="icon icon-checkbox"></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + key + ' (' + types[key] + ' bets)</div><div class="item-after">' + FUNC.ShowBalance2(result.details[key].possibleWin, _V.USER.finance.currency) + '</div></div></div></label></li>';
                        }

                    }
                });

                _V._POPUPS.bet_variant = app.sheet.create({
                    popupPush: true,
                    backdrop: true,
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
        BET.CouponEQUAL("SelectTypeSave");
        this.calculateWinningMoney("SelectTypeSave");
        BET.checkView();
        this.bankosOnOff();

    }

    bankosOnOff() {
        const hasMultipleOutcomes = this.ActiveCoupon.some(match => match.outComes.length > 1);
        if (this.currentSelections.filter(O => /^\d+\/\d+$/.test(O)).length > 0 && hasMultipleOutcomes) this.bankos = hasMultipleOutcomes; else this.bankos = false;
        if (this.bankos) $('.btslp_banko_option').removeClass('kapali'); else $('.btslp_banko_option').addClass('kapali')
        return this.bankos;

    }

    addMatch(matchId, oddValue, marketId, outComeId, marketName) {
        if (this.isExists(matchId, marketId, outComeId)) {
            this.removeMatch(matchId, outComeId);
            return;
        }

        var maxTicketSize = this.filtered("min")?.sportMaxTicketSize?.value;
        if (this.ActiveCoupon.reduce((sum, item) => sum + item.outComes.length, 0) >= maxTicketSize && maxTicketSize > 0) {
            FUNC.theMessage(LANG.formatLang(lang.LIMITS.sportMaxTicketSize, { "value": maxTicketSize }), "warning", "top");
            this.removeMatch(matchId, outComeId);
            return;
        }


        let match = this.ActiveCoupon.find(m => m.matchId === matchId);
        if (!match) {
            match = { matchId, outComes: [] };
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
                status: _V.MATCHES[matchId].competition.status,
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
            match.outComes.push({ outComeId, oddValue, marketId, marketName });
        }
        this.updateTotalPossibleWinning("addMatch");
        this.checkView();
        this.bankosOnOff();


        var maxSameOutCome = BET.filtered("min")?.sportRisksMaxSameT?.value;
        //  console.log(maxSameOutCome,this.ActiveCoupon.reduce((max, item) => Math.max(max, item.outComes.length), 0))
        if (this.ActiveCoupon.reduce((max, item) => Math.max(max, item.outComes.length), 0) > maxSameOutCome && maxSameOutCome > 0) {
            FUNC.theMessage(LANG.formatLang(lang.LIMITS.sportRisksMaxSameT, { "value": maxSameOutCome }), "warning", "top");
            this.removeMatch(matchId, outComeId);
            return;

        }

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

    getReductionForOdds(oddValue, isLive = false) {
        const pl = isLive ? 'live' : 'prematch';
        if (!_V.SETTINGS.sys[pl + '_cashout'] || !_V.USER.filters.games[pl].isCashOutActive) return 0;
        const reductions = _V.USER.filters.games[pl].cashout && _V.USER.filters.games[pl].cashout.length > 0 ? _V.USER.filters.games[pl].cashout : _V.Cashout[pl];
        const reductionForOdd = reductions.reduce((acc, item) => {
            const maxOdd = parseFloat(Object.keys(item)[0]);
            const reduction = item[maxOdd];

            if (oddValue <= maxOdd && (acc === null || maxOdd < acc.maxOdd)) {
                return { maxOdd, reduction };
            }
            return acc;
        }, null);
        //
        return reductionForOdd ? reductionForOdd.reduction : 0;
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
        this.updateTotalPossibleWinning("checkView");
        this.calculateWinningMoney("checkView")

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

    removeAll() {
        app.dialog.confirm("Are you sure you want to remove all bets?", function () {
            BET.ActiveCoupon.map(O => O.matchId)
            BET.ActiveCoupon.forEach((match, index) => {
                match.outComes.forEach(function (out) {
                    BET.removeMatch(match.matchId, out.outComeId)
                })

            })
        });
    }
    checkMyCoupon() {
        if (this.ActiveCoupon.length > 0) {
            var td = '';
            var bankodIds = []
            this.ActiveCoupon.forEach(function (bet, i) {
                bet.outComes.forEach(function (odd, k) {
                    if (odd.isBanko && bankodIds.indexOf(bet.matchId)) bankodIds.push(bet.matchId);
                    td += '<div class="col-100 medium-50"><div class="card no-radius betrow"><div class="card-content card-content-padding mrow"><div class=row><div class="col-auto btslp_banko_option opst_' + bet.matchId + ' kapali"><button class="button  button-28 button-outline" style="border-radius:2px"  onclick="BET.makeBanko(\'' + bet.matchId + '\')">B</button></div> <div class="align-self-center col"><p class="no-margin-bottom"><h5>' + FUNC.MarketName(odd.marketName) + ' : ' + FUNC.M(odd.marketId, odd.outComeId) + '</h5> <small class="font13 text-secondary">' + _V.MATCHES[bet.matchId].competition.competitors[0].name + ' - ' + _V.MATCHES[bet.matchId].competition.competitors[1].name + '</small> <br>   <small class="size-12 text-secondary betslip_ration_bottomlimit">1-3000 CHF</small></div><div class="align-self-center col-auto no-padding-left"><span class="betslip_ration">' + odd.oddValue + '</span> <i class="bi bi-x-circle text-color-gray" onclick="BET.removeMatch(\'' + bet.matchId + '\',\'' + odd.outComeId + '\')"></i></div></div></div></div></div>';
                })
            })
            $('.betSlipContent').html('<div class="row betsliptabs" style="background: #314fb1 !important"><div class="col"><button class="typesliptbtn button btn-sm button-outline button-raised " onclick="BET.view(\'showVariants\')">Single <i class="bi bi-caret-down-fill"></i></button></div><div class="col-auto align-items-center margin-auto"><button class="button button-28 button-outline button-raised color-white" onclick="BET.removeAll()" ><i class="bi bi-trash3"></i></button></div> </div><div id="slipBody" class="">' + td + ' </div>' +
                '<div class="betslip_footer"><div style="margin: 0px;" class="list list-dividers-ios list-outline-ios list-strong-ios media-list"><ul><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Total Rates</div><div class="item-after total_coupon_rate" data-total-rate="">##</div></div></div></a></li><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Number of Bets</div><div class="item-after co_numberbets" data-total-rate="">##</div></div></div></a></li><li><a class="item-content item-link"><div class="item-inner"><div class="item-title-row noContent"><div class="item-title">Bonus %5</div><div class="item-after co_bonus" >##</div></div></div></a></li> ' +
                '<li class="item-content item-input stakeCmnt"><div class="co_stli item-media"><span class="co_numberbets">0</span>x</div><div class="item-inner stake-per-bate" onclick="BET.Keyboard()"><div class="item-title item-label">Stake per bet</div><div class="item-input-wrap stls"><input type="text" placeholder="' + _V.USER.finance.currency + '' + this.betAmount + '" id="stakeInp" onkeyup="BET.changeStake(this.value)" class="stakeInp"><span class="input-clear-button"></span></div></div>    <div class="item-inner stake-per-bate" onclick="BET.Keyboard()"><div class="item-title item-label">Total Stake</div><div class="item-input-wrap stls"><input type="text" placeholder="' + FUNC.ShowBalance(this.betAmount, _V.USER.finance.currency) + '" id="stakeInpAll" onkeyup="BET.changeStake(this.value)" class="stakeInpAll"><span class="input-clear-button"></span></div></div>    <div class="item-inner possinbg text-align-right"><div class="item-title item-label">Poss. Winnings</div><div class="item-input-wrap possibleWinning">##</span></div></div></li> </ul></div></div>');

            $('.placeBetBtn').removeClass('kapali');
            bankodIds.forEach((matchId) => {
                this.makeBanko(matchId, true);
            })
            this.CouponEQUAL();
            this.calculateWinningMoney("checkMyCoupon");
            this.checkView();
            this.bankosOnOff();

        } else {
            $('.betSlipContent').html('<div class="noBetScreen"><p><center><img src="assets/img/empty.svg" alt=""> <br><p style="color:#ffffff8a;padding:20px">**No bets selected yet. Click on the respective odds to select the bets</p> </center></p></div>');
            $('.placeBetBtn').addClass('kapali');
        }
    }

    makeBanko(matchId, setter = false) {
        if (!setter) {
            if (BET.ActiveCoupon.find(O => O.matchId === matchId).outComes[0].isBanko) {
                $('.opst_' + matchId).removeClass('button-active');
                BET.ActiveCoupon.find(O => O.matchId === matchId).outComes.forEach(function (o) {
                    o.isBanko = false;
                });
            } else {
                $('.opst_' + matchId).addClass('button-active');
                BET.ActiveCoupon.find(O => O.matchId === matchId).outComes.forEach(function (o) {
                    o.isBanko = true;
                });
            }
        } else {
            const hasMultipleOutcomes = this.ActiveCoupon.some(match => match.outComes.length > 1);
            console.log(hasMultipleOutcomes)
            if (hasMultipleOutcomes) {
                BET.ActiveCoupon.find(O => O.matchId === matchId).outComes.forEach(function (o) {
                    o.isBanko = true;
                    $('.opst_' + matchId).addClass('button-active');
                });
            } else {
                BET.ActiveCoupon.forEach(function (B) {
                    $('.opst_' + B.matchId).removeClass('button-active');
                    B.outComes(function (o) {
                        o.isBanko = false;
                    })
                });
            }
        }
        this.CouponEQUAL();
    }

    SaveStake() {
        var amount = parseFloat($('div.keyboard-header span.amount').text());
        this.betAmount = amount > 0 ? amount : 1;
        _V._POPUPS.keyboard?.close();

    }

    Keyboard() {
        var self = this;
        _V._POPUPS.tickets?.close();
        _V._POPUPS.keyboard = _V._POPUPS.keyboard || app.sheet.create({
            popupPush: true,
            push: true,
            backdrop: true,
            on: {
                open: function () {
                    let isFirstEntry = true;
                    const $amountDisplay = $('div.keyboard-header span.amount');
                    const $maxPayout = $('.amount_totalPossibleWinning');
                    $('div.keyboard-number ul li a').off('click').on('click', function () {
                        var maxStakeLimit = self.ActiveCoupon.some(match => match.competition.isLive) ? self.filtered("max")?.sportRisksMaxPayoutL?.value : self.filtered("max")?.sportRisksMaxPayoutP?.value;
                        const val = $(this).data('val');
                        let current = $amountDisplay.text();
                        if (val === 'C') {
                            current = current.length > 1 ? current.slice(0, -1) : '1';
                            isFirstEntry = current === '1' || current === '';
                        } else {
                            current = (isFirstEntry || current === '0') ? val.toString() : current + val.toString();
                            isFirstEntry = false;
                        }
                        if (!isFirstEntry && (maxStakeLimit !== -1 && parseFloat(current) > maxStakeLimit)) {
                            $maxPayout.html('<small>##.##</small>');
                            $('.possmaxwin').addClass('text-color-red');
                            $('.btncomfirmkeyboard').addClass('kapali');
                        } else {
                            $maxPayout.text((parseFloat(current) * BET.totalPossibleWinning).toFixed(2));
                            $('.btncomfirmkeyboard').removeClass('kapali');
                            $('.possmaxwin').removeClass('text-color-red');
                        }
                        $amountDisplay.text(current.length > 0 ? current : '1');
                    });
                },
                close: function (popup) {
                    _V._POPUPS.tickets?.open();
                },
                opened: function (popup) {
                    $('.amount_totalPossibleWinning').text(BET.totalPossibleWinning.toFixed(2));
                },
            },
            content: `<div class="sheet-modal keyboard-wrap">
                        <div class="toolbar">
                
                            <div class="toolbar-inner">
                                <div class="keyboard-header clear">
                                    <div class="left">
                                        <p class="p-0 m-0 text ">Stake per Bet </p>
                                        <small class="currency margin-right text-color-gray m-2">${BET.totalBets}x</small>
                                        <span class="currency">${_V.USER.finance.currency}</span>
                                        <span class="amount" contenteditable="false">1</span>
                                    </div>
                                    <div class="right">
                                        <p class="p-0 m-0 text possmaxwin">Max. Poss. Win </p>
                                        <span class="currency text-secondary">${_V.USER.finance.currency}</span>
                                        <span class="amount_totalPossibleWinning" contenteditable="false">${FUNC.ShowBalance(BET.totalPossibleWinning, _V.USER.finance.currency)}</span>
                                    </div>   
                                </div>      
                            </div>
                        </div>
                        <div class="sheet-modal-inner">
                            <div class="page-content">
                                <div class="">
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
                                   <div class="keyboard-buttons" style="display: flex; justify-content: space-between;margin-right: 20px">
                                    <button style="flex: 3; margin-right: 10px;"  onclick="BET.SaveStake();" class="button button-large button-raised button-fill color-theme btncomfirmkeyboard">Confirm</button>
                                    <button onclick="_V._POPUPS.keyboard?.close()" style="flex: 1;" class="button button-large button-raised color-gray btncancelkeyboard">Cancel</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        });
        _V._POPUPS.keyboard.open();

    }

    totalBets() {
        const betResults = this.calculateBetResults();
        let totalBets = 0;
        this.currentSelections.forEach(selection => {

            if (betResults.details[selection]) {
                totalBets += betResults.details[selection].count;
            } else if (betResults.details.combinations && betResults.details.combinations[selection]) {
                totalBets += betResults.details.combinations[selection].count;
            }
        });
        this.totalBets = totalBets;
        return totalBets;
    }

    calculateWinningMoney(page) {
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

    CouponEQUAL() {

        $('.total_coupon_rate').html(this.calculateTotalRates());
        $('.co_bonus').html("0.00");
        $('.co_numberbets').html(this.totalBets);
        $('.stakeInp').val((this.betAmount).toFixed(2));
        $('.stakeInpAll').val((this.betAmount * this.totalBets).toFixed(2));
        $('.possibleWinning').html(this.calculateWinningMoney("CouponEQUAL").toFixed(2));

        const typeslipBtn = document.querySelector('.typesliptbtn');
        if (typeslipBtn) {
            if (this.currentSelections.length > 1 || this.currentSelections.includes("system")) {
                typeslipBtn.innerHTML = 'System <i class="bi bi-caret-down-fill"></i>'
            } else {
                typeslipBtn.innerHTML = this.currentSelections[0] + '<i class="bi bi-caret-down-fill"></i>'
            }
        }
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

    /*    calculateMultiway() {
            return this.ActiveCoupon.reduce((total, match) => {
                const maxOdd = Math.max(...match.outComes.map(outcome => outcome.oddValue));
                return total * maxOdd;
            }, 1) * this.betAmount;
        }*/
    calculateMultiway() {
        let combiOdds = [];
        this.generateCombiOdds(this.ActiveCoupon, [], combiOdds);
        let maxTotalOdds = 0;
        combiOdds.forEach(oddsCombination => {
            const totalOdds = oddsCombination.reduce((product, odd) => product * odd, 1);
            if (totalOdds > maxTotalOdds) {
                maxTotalOdds = totalOdds;
            }
        });
        return maxTotalOdds * this.betAmount;
    }

    generateCombiOdds(matches, currentCombination, combiOdds, index = 0) {
        if (index === matches.length) {
            combiOdds.push(currentCombination.map(odd => parseFloat(odd)));
            return;
        }
        matches[index].outComes.forEach(outcome => {
            this.generateCombiOdds(matches, [...currentCombination, outcome.oddValue], combiOdds, index + 1);
        });
    }

    calculateBetResults222222() {
        const results = {
            totalBets: 0,
            totalWin: 0,
            totalLost: 0,
            details: {},
            newCashout: 0
        };

        // Banko seçimlerin oranlarını hesapla
        let bankoOdds = 1;
        this.ActiveCoupon.forEach(match => {
            match.outComes.forEach(outcome => {
                if (outcome.isBanko) {
                    bankoOdds *= parseFloat(outcome.oddValue);
                }
            });
        });

        // Single bahisler
        results.details.single = {
            count: this.calculateCouponCounts().single,
            possibleWin: this.calculateSingle() * bankoOdds,
            cashout: this.calculateSachaCashout('single', this.calculateSingle() * bankoOdds),
            isWin: this.checkSingleWin()
        };
        results.totalBets += results.details.single.count;
        if (results.details.single.isWin) {
            results.totalWin += results.details.single.possibleWin;
        } else {
            results.totalLost += this.betAmount * results.details.single.count;
        }

        // Combi bahisler
        results.details.combi = {
            count: this.calculateCouponCounts().multi,
            possibleWin: this.calculateMultiway() * bankoOdds,
            cashout: this.calculateSachaCashout('combi', this.calculateMultiway() * bankoOdds),
            isWin: this.calculateMultiwayWin()
        };
        results.totalBets += results.details.combi.count;
        if (results.details.combi.isWin) {
            results.totalWin += results.details.combi.possibleWin;
        } else {
            results.totalLost += this.betAmount * results.details.combi.count;
        }

        // Kombinasyon bahisleri
        const couponTypes = this.calculateCouponTypes();
        results.details.combinations = {};
        Object.keys(couponTypes.combinations).forEach(combinationType => {
            const possibleWin = this.calculateCombinationWins(combinationType) * bankoOdds; // Banko seçimlerin kazançları dahil edilir
            results.details.combinations[combinationType] = {
                count: couponTypes.combinations[combinationType],
                possibleWin: possibleWin,
                cashout: this.calculateSachaCashout('combinations', possibleWin),
                isWin: this.checkWin(combinationType)
            };
            results.totalBets += results.details.combinations[combinationType].count;
            if (results.details.combinations[combinationType].isWin) {
                results.totalWin += possibleWin;
            } else {
                results.totalLost += this.betAmount * results.details.combinations[combinationType].count;
            }
        });

        // Yeni nakit çıkışı hesaplaması
        results.newCashout = parseFloat(this.newCashout());

        return results;
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

    /* calculateCombinations2(matches, k) {
         const combinations = [];
         const combine = (start, chosenMatches) => {
             if (chosenMatches.length === k) {
                 combinations.push([...chosenMatches]);
                 return;
             }
             for (let i = start; i < matches.length; i++) {
                 const match = matches[i];
                 const selectedOutcome = match.outComes.find(outcome => !outcome.isBanko);
                 if (selectedOutcome) {
                     const updatedChosenMatches = [...chosenMatches, { ...match, outComes: [selectedOutcome] }];
                     combine(i + 1, updatedChosenMatches);
                 }
             }
         };

         combine(0, []);

         return combinations;
     }*/
    /* calculateTotalTicketsForType(combinationSize, totalMatches) {
         // Her maç için olası outcome sayısını hesapla
         const outcomesPerMatch = this.ActiveCoupon.map(match => match.outComes.length);

         // Seçilen kombinasyon boyutu için olası tüm bilet kombinasyonlarının sayısını hesapla
         let totalTickets = 0;

         // Kombinasyonları hesaplamak için yardımcı fonksiyon
         const matchCombinations = this.getCombinations(Array.from({ length: totalMatches }).map((_, i) => i + 1), combinationSize);

         // Her kombinasyon için olası outcome kombinasyonlarının sayısını hesapla ve topla
         matchCombinations.forEach(combination => {
             const outcomeCombinations = combination.reduce((acc, matchIndex) => acc * outcomesPerMatch[matchIndex - 1], 1);
             totalTickets += outcomeCombinations;
         });

         return totalTickets;
     }*/

    /*
    calculateBetResults() {
        let bankoExists = this.ActiveCoupon.some(match => match.outComes.some(outcome => outcome.isBanko));
        let results = {
            totalBets: 0,
            totalWin: 0,
            totalLost: 0,
            details: {
                single: {},
                combi: {},
                combinations: {}
            },
            newCashout: 0
        };
        const  countBankoOutcome = () => {
            // Her bir maç için, en az bir isBanko=true olan outcome varsa, bu maçı hesaba kat
            const bankoMatchesCount = this.ActiveCoupon.reduce((count, match) => {
                // Maçın outcomes'ları içinde isBanko=true olan en az bir outcome varsa, count'u artır
                const hasBanko = match.outComes.some(outcome => outcome.isBanko);
                return count + (hasBanko ? 1 : 0);
            }, 0);

            return bankoMatchesCount;
        }

        const singleSelections = this.ActiveCoupon.flatMap(match =>
            match.outComes.map(outcome => [parseFloat(outcome.oddValue)])
        );

        results.details.single.count = this.calculateCouponCounts().single;
        results.details.single.possibleWin = this.calculateSingle();
        results.details.single.isWin = this.checkSingleWin();
        results.totalBets += results.details.single.count;
        // results.details.single.selections = singleSelections
        if (bankoExists) {
            results.details.combi.count = this.calculateCouponCounts().multi;
            results.details.combi.possibleWin = this.calculateMultiway();
            results.details.combi.isWin = this.calculateMultiwayWin();
            results.totalBets += results.details.combi.count;
            const couponTypes = this.calculateCouponTypes();
            Object.keys(couponTypes.combinations).forEach(combinationType => {
                const combinationSize = parseInt(combinationType.split('/')[0]);

                const combinations = this.calculateCombinations2(this.ActiveCoupon, combinationSize);

                let possibleWin = 0;

                combinations.forEach(combination => {
                    let combinationOdds = 1;
                    let isCombinationBanko = true;
                    const selections = [];
                    combination.forEach(match => {
                        if (!match.outComes[0].isBanko) {
                            isCombinationBanko = false;
                            const maxOdd = Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)));
                            combinationOdds *= maxOdd;
                        }
                    });

                    // Eğer kombinasyon içindeki tüm maçlar "isBanko" olarak işaretlenmemişse kazancı ekle
                    if (!isCombinationBanko) {
                        possibleWin += combinationOdds;
                    }
                });
                const totalMatches = parseInt(combinationType.split('/')[1]);
                const totalTickets = this.calculateTotalTicketsForType(combinationSize, totalMatches-countBankoOutcome())

                results.details.combinations[combinationType] = {
                    count: totalTickets,
                    possibleWin: possibleWin,
                    isWin: this.checkWin(combinationType),
                    //  selections
                };
                results.totalBets += totalTickets
            });

        } else {
            let allOdds = this.ActiveCoupon.map(match =>
                Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)))
            );


            results.details.combi.count = this.calculateCouponCounts().multi;
            results.details.combi.possibleWin = allOdds.reduce((acc, odds) => acc + (odds * this.betAmount), 0);
            results.details.combi.isWin = this.calculateMultiwayWin();

            const couponTypes = this.calculateCouponTypes();
            Object.keys(couponTypes.combinations).forEach(combinationType => {
                const combinationSize = parseInt(combinationType.split('/')[0]);
                const combinations = this.calculateCombinations(this.ActiveCoupon, combinationSize);
                let possibleWin = 0;

                combinations.forEach(combination => {
                    let combinationOdds = 1;
                    combination.forEach(match => {
                        const maxOdd = Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)));
                        combinationOdds *= maxOdd;
                    });
                    possibleWin += combinationOdds;
                });
                const totalMatches = parseInt(combinationType.split('/')[1]);
                const totalTickets = this.calculateTotalTicketsForType(combinationSize, totalMatches);




                results.details.combinations[combinationType] = {
                    count: totalTickets,
                    possibleWin: possibleWin,
                    isWin: this.checkWin(combinationType),
                };
            });
        }

        results.totalWin = results.details.single.isWin ? results.details.single.possibleWin : 0;
        results.totalLost = this.betAmount * results.totalBets - results.totalWin;
        results.newCashout = parseFloat(this.newCashout());

        return results;
    }
    */

    TicketSIZE(picker) {
        const convertDataToTicketArray = () => {
            const ticketArray = [];
            this.ActiveCoupon.forEach(coupon => {
                coupon.outComes.forEach(outCome => {
                    // isBanko true ise 1, değilse 0 olarak ayarla
                    const isBanko = outCome.isBanko ? 1 : 0;
                    // oddValue, matchId ve isBanko durumunu diziye ekle
                    ticketArray.push([parseFloat(outCome.oddValue), coupon.matchId, isBanko]);
                });
            });

            return ticketArray;
        }
        const uniquer = (ticketArray) => {
            const matchUniqueArray = [];
            const index = [];
            const freq = [];

            ticketArray.forEach((row) => {
                const indexInUniqueArray = matchUniqueArray.indexOf(row[1]);
                if (indexInUniqueArray === -1) {
                    matchUniqueArray.push(row[1]);
                    index.push(row);
                    freq.push(1);
                } else {
                    freq[indexInUniqueArray]++;
                }
            });

            const newMatrix = index.map((row, idx) => [...row, freq[idx]]);
            const matchCount = newMatrix.length;

            return [newMatrix, matchCount];

        }
        const bankCounting = (newMatrix) => {
            let bankCount = 0;
            const bankIndex = [];

            newMatrix.forEach((row, idx) => {
                if (row[2] === 1) {
                    bankCount++;
                    bankIndex.push(idx);
                }
            });

            return [bankCount, bankIndex];
        }
        const combinations = (arr, k) => {
            const result = [];

            function backtrack(start, current) {
                if (current.length === k) {
                    result.push([...current]);
                    return;
                }

                for (let i = start; i < arr.length; i++) {
                    current.push(arr[i]);
                    backtrack(i + 1, current);
                    current.pop();
                }
            }

            backtrack(0, []);
            return result;
        }
        const combining = (bankCount, newMatrix) => {
            const arr = newMatrix.slice(bankCount).map(row => row[3]);
            const combinationsDict = {};

            for (let r = 1; r <= arr.length; r++) {
                const combList = combinations(arr, r);
                for (const comb of combList) {
                    const key = comb.length;
                    const product = comb.reduce((acc, curr) => acc * curr, 1);
                    if (key in combinationsDict) {
                        combinationsDict[key] += product;
                    } else {
                        combinationsDict[key] = product;
                    }
                }
            }

            return [combinationsDict, arr];
        }

        const main = (picker) => {
            const tarr = convertDataToTicketArray(this.ActiveCoupon);
            const [newMatrix, matchCount] = uniquer(tarr);
            const [bankCount, bankIndex] = bankCounting(newMatrix);
            const [combinationsDict, arr] = combining(bankCount, newMatrix);
            const rArr = Object.fromEntries(Object.entries(combinationsDict).map(([key, value]) => [parseInt(key) + bankCount, value]));
            return rArr[picker];
        }
        return main(picker);
    }

    calculateBetResults() {
        let bankoExists = this.ActiveCoupon.some(match => match.outComes.some(outcome => outcome.isBanko));
        let results = {
            possibleWin: 0,
            totalBets: 0,
            totalWin: 0,
            totalLost: 0,
            ticket: {
                maxPayout: 0,
                won: 0,
                bets: 0,


            },
            details: {
                single: {},
                combi: {},
                combinations: {}
            },
            newCashout: 0
        };

        const countBankoOutcome = () => {
            // Her bir maç için, en az bir isBanko=true olan outcome varsa, bu maçı hesaba kat
            const bankoMatchesCount = this.ActiveCoupon.reduce((count, match) => {
                // Maçın outcomes'ları içinde isBanko=true olan en az bir outcome varsa, count'u artır
                const hasBanko = match.outComes.some(outcome => outcome.isBanko);
                return count + (hasBanko ? 1 : 0);
            }, 0);

            return bankoMatchesCount;
        }

        const singleSelections = this.ActiveCoupon.flatMap(match =>
            match.outComes.map(outcome => [{
                ...outcome,
                matchId: match.matchId
            }])
        );

        function transformDataToOddsArray(data) {
            // Maç ID'lerine göre outcome'ları gruplandır
            const matches = {};

            data.forEach(outcomeArray => {
                outcomeArray.forEach(outcome => {
                    const { matchId, oddValue } = outcome;
                    if (!matches[matchId]) {
                        matches[matchId] = [];
                    }
                    matches[matchId].push(oddValue);
                });
            });

            // Her maç için oddValue'ları içeren tüm kombinasyonları oluştur
            const allCombinations = Object.values(matches);

            // Tüm mümkün kombinasyonları hesapla
            function getAllCombinations(arr, index = 0, currentCombination = [], allCombinations = []) {
                if (index === arr.length) {
                    allCombinations.push([...currentCombination]);
                    return allCombinations;
                }

                for (let i = 0; i < arr[index].length; i++) {
                    getAllCombinations(arr, index + 1, [...currentCombination, arr[index][i]], allCombinations);
                }

                return allCombinations;
            }

            return getAllCombinations(allCombinations);
        }

        results.details.single.possibleWin = this.calculateSingle();
        results.details.single.pay = this.allOutcomes().filter(item => item.result === "Won").reduce((acc, match) => acc + (parseFloat(match.oddValue) * this.betAmount), 0);
        results.details.single.count = this.calculateCouponCounts().single;
        results.details.single.isWin = this.checkSingleWin();
        results.details.single.selections = singleSelections;
        results.details.single.winners = this.allOutcomes().filter(item => item.result === "Won");
        results.totalBets += results.details.single.count;
        results.possibleWin += results.details.single.possibleWin;
        results.totalWin += parseFloat(results.details.single.pay)

        if (this.currentSelections.includes("single")) {
            results.ticket.maxPayout += this.calculateSingle();
            results.ticket.won += parseFloat(results.details.single.pay);
            results.ticket.bets += results.details.single.count;
        }
        let returned = false;
        if (bankoExists) {
            results.details.combi.count = this.calculateCouponCounts().multi;
            results.details.combi.possibleWin = this.calculateMultiway();
            results.details.combi.isWin = this.calculateMultiwayWin();
            results.totalBets += results.details.combi.count || 0;
            const couponTypes = this.calculateCouponTypes();
            Object.keys(couponTypes.combinations).forEach(combinationType => {
                //if(combinationType==="3/4"){
                const combinationSize = parseInt(combinationType.split('/')[0]);
                //const combi = this.calculateCombinationsWithHighestOdds(combinationSize);
                const cls = this.bankoTotalMoney(combinationType)
                const combi = this.bankoSystem(combinationSize);
                const counter = this.TicketSIZEBanko(parseInt(combinationType.split('/')[0]));
                const t1 = this.T1(this.ActiveCoupon, parseInt(combinationType.split('/')[0]));
                const totalMatches = parseInt(combinationType.split('/')[1]);
                const totalTickets = this.calculateTotalTicketsForType(combinationSize, totalMatches - countBankoOutcome());
                const TS = this.TicketSIZE(parseInt(combinationType.split('/')[0]));
                console.log(TS)
                if (typeof TS === "number") {
                    results.details.combinations[combinationType] = {
                        count: TS || 0,
                        possibleWin: combi.possibleWin,
                        isWin: this.checkWin(combinationType),
                        pay: combi.pay,
                        selections: this.bankoMatrix(combinationType),
                        //selections : combi.oddsInCombinations,
                        fx: combi.fx
                    };
                } else {
                    console.log(combinationType, " depressed")
                    /* this.currentSelections = this.currentSelections.filter(item => item !== combinationType);
                     console.log(combi.fx)
                     combi.fx.forEach(function (matchId) { updateler geldi
                         console.log(matchId)
                     })*/
                    this.ActiveCoupon.forEach(match => match.outComes.forEach(outcome => outcome.isBanko = false));
                    this.currentSelections = ["single"];
                    this.checkMyCoupon()
                    return this.calculateBetResults()
                }

                results.totalBets += combi.count || 0;
                //}
            });


        } else {

            let allOdds = this.ActiveCoupon.map(match =>
                Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)))
            );
            const couponTypes = this.calculateCouponTypes();
            results.details.combi.count = 1;
            results.details.combi.possibleWin = results.details.single.selections.reduce((acc, current) => acc * current[0].oddValue, 1);
            results.details.combi.isWin = this.calculateMultiwayWin();
            results.details.combi.pay = this.calculateMultiwayWin() ? results.details.single.selections.reduce((acc, current) => acc * current[0].oddValue, 1) : 0;
            results.details.combi.selections = this.ActiveCoupon.flatMap(match =>
                match.outComes.map(outcome => ({
                    ...outcome,
                    matchId: match.matchId
                }))
            );

            results.totalBets += results.details.combi.count;
            results.possibleWin += results.details.combi.possibleWin;
            if (this.currentSelections.includes("combi")) {
                results.ticket.maxPayout += results.details.combi.possibleWin;
                results.ticket.won += results.details.combi.pay;
                results.ticket.bets += results.details.combi.count;
            }


            Object.keys(couponTypes.combinations).forEach(combinationType => {

                // if(combinationType==="3/4"){
                const combinationSize = parseInt(combinationType.split('/')[0]);
                const combi = this.calculateCombinationsWithoutBanko(combinationSize);
                const calcCombi = this.generateOutcomeCombinationsAndTotal(combinationType);

                results.details.combinations[combinationType] = {
                    count: combi.count,
                    possibleWin: parseFloat((combi.possibleWin*this.betAmount).toFixed(2)),
                    isWin: this.checkWin(combinationType),
                    pay: parseFloat((calcCombi.pay * this.betAmount).toFixed(2)),
                    selections: calcCombi.odds
                };
                results.totalBets += combi.count;
                results.possibleWin += results.details.combinations[combinationType].possibleWin;
                results.totalWin += parseFloat(calcCombi.pay);
                if (this.currentSelections.includes(combinationType)) {
                    results.ticket.maxPayout += results.details.combinations[combinationType].possibleWin;
                    results.ticket.won += calcCombi.pay;
                    results.ticket.bets += combi.count;
                }
                // }
            });

        }

        results.possibleWin = parseFloat((results.possibleWin).toFixed(2));
        results.totalWin = parseFloat((results.totalWin).toFixed(2))
        results.totalLost = this.betAmount * results.totalBets - results.totalWin;
        results.newCashout = parseFloat(this.newCashout());

        results.ticket.maxPayout = parseFloat((results.ticket.maxPayout).toFixed(2))
        results.ticket.won = parseFloat((results.ticket.won).toFixed(2));

        return returned === true ? this.calculateBetResults() : results;
    }

    calculateCouponCounts() {
        const couponCounts = {
            single: 0,
            multi: 0,
            system: 0
        };
        this.ActiveCoupon.forEach(match => {
            couponCounts.single += match.outComes.length;
        });
        if (this.ActiveCoupon.length > 1) {
            couponCounts.multi = this.ActiveCoupon.reduce((acc, match) => acc * match.outComes.length, 1);
        }
        if (this.ActiveCoupon.every(match => match.outComes.length >= 2)) {
            couponCounts.system = this.calculateSystemCouponCount();
        }
        return couponCounts;
    }


    calculateCombinationsWithBankoAndDetails(combinationSize) {

        const combinationsSubset = (array, subsetSize) => {
            function combine(start, subset) {
                if (subset.length === subsetSize) {
                    combinations.push([...subset]);
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    combine(i + 1, [...subset, array[i]]);
                }
            }

            let combinations = [];
            combine(0, []);
            return combinations;
        }


        let bankoOdds = [];
        let nonBankoMatches = [];

        this.ActiveCoupon.forEach(match => {
            const bankoOutcome = match.outComes.find(outcome => outcome.isBanko);
            if (bankoOutcome) {
                bankoOdds.push(parseFloat(bankoOutcome.oddValue));
            } else {
                // Aynı marketId için en yüksek oddValue'yi bul ve farklı marketId'ler varsa hepsini dikkate al
                let outcomesByMarket = match.outComes.reduce((acc, outcome) => {
                    const marketId = outcome.marketId;
                    const oddValue = parseFloat(outcome.oddValue);
                    if (!acc[marketId] || acc[marketId] < oddValue) {
                        acc[marketId] = oddValue; // En yüksek oddValue'yi güncelle
                    }
                    return acc;
                }, {});

                nonBankoMatches.push(...Object.values(outcomesByMarket).map(oddValue => oddValue));
            }
        });

        // Tüm kombinasyonları ve detayları hesapla
        let combinations = combinationsSubset(nonBankoMatches, combinationSize - bankoOdds.length);
        let totalTickets = combinations.length;
        let possibleWin = combinations.reduce((acc, combination) => {
            return acc + combination.reduce((product, odd) => product * odd, bankoOdds.reduce((product, odd) => product * odd, 1));
        }, 0);

        // Her kombinasyonda kullanılan oddValues'leri hesapla
        let oddsInCombinations = combinations.map(combination => [...combination, ...bankoOdds]);

        return {
            possibleWin,
            count: totalTickets,
            combinations: combinations.map(comb => comb.map(odd => ({ oddValue: odd }))),
            oddsInCombinations
        };
    }

    calculateMultiwayWin() {
        return this.ActiveCoupon.every(match =>
            match.outComes.some(outcome => outcome.result === "Won")
        );
    }

    calculateCombinationWin(combinationType) {
        const combinationSize = parseInt(combinationType.split('/')[0]);
        const combinations = this.calculateCombinations(this.ActiveCoupon, combinationSize);

        return combinations.some(combination => {
            return combination.every(match => {
                return match.outComes.some(outcome => outcome.result === "Won")
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
        }
    }

    /* checkWin(type) {
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
     }*/
    /* checkSingleWin() {
         return this.ActiveCoupon.every(match =>
             match.outComes.every(outcome => outcome?.result === "Won")
         );
     }*/

    /*    checkSingleWin() {
            return this.ActiveCoupon.every(match =>
                match.outComes.every(outcome => outcome.isBanko || outcome.result === "Won")
            );
        }*/
    checkSingleWin() {
        return this.allOutcomes().some(item => item.result === "Won");
    }

    checkMultiwayWin() {
        return this.ActiveCoupon.every(match =>
            match.outComes.some(outcome => outcome.result === "Won")
        );
    }

    /*  calculateTotalRates(type = "single") {
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
      }*/
    calculateTotalRates(type = "single") {
        let totalRates = 0;
        if (type === 'single') {
            totalRates = this.ActiveCoupon.reduce((total, match) => {
                return total + match.outComes.reduce((sum, outcome) => {
                    return sum + (outcome.isBanko === true ? 1 : parseFloat(outcome.oddValue));
                }, 0);
            }, 0);
        } else if (type === 'combi') {
            totalRates = this.ActiveCoupon.reduce((total, match) => {
                return total * match.outComes.reduce((product, outcome) => {
                    return product * (outcome.isBanko === true ? 1 : parseFloat(outcome.oddValue));
                }, 1);
            }, 1);
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

    /* calculateCombinations(matches, k) {
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
     }*/
    /*calculateCombinationWins(combinationType) {
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
    }*/
    /*    calculateCombinationWins(combinationType) {
            let totalWin = 0;
            const combinationSize = parseInt(combinationType.split('/')[0]);
            const combinations = this.calculateCombinations(this.ActiveCoupon, combinationSize);
            combinations.forEach(combination => {
                let combinationOdds = combination.reduce((product, match) => {
                    return product * match.outComes.reduce((maxOdd, outcome) => {
                        return Math.max(maxOdd, outcome.isBanko ? 1 : parseFloat(outcome.oddValue));
                    }, 0);
                }, 1);
                totalWin += combinationOdds * this.betAmount;
            });
            return totalWin;
        }*/
    /*    calculateCombinationWins(combinationType) {
            let totalWin = 0;
            const combinationSize = parseInt(combinationType.split('/')[0]);
            const combinations = this.calculateCombinations(this.ActiveCoupon, combinationSize);
            combinations.forEach(combination => {
                let combinationOdds = combination.reduce((product, match) => {
                    return product * match.outComes.reduce((maxOdd, outcome) => {
                        if (outcome.isBanko) {
                            return product * parseFloat(outcome.oddValue);
                        } else {
                            return Math.max(maxOdd, parseFloat(outcome.oddValue));
                        }
                    }, 0);
                }, 1);
                totalWin += combinationOdds * this.betAmount;
            });
            return totalWin;
        }*/

    /* calculateCombinationWins(combinationType) {
         let totalWin = 0;
         // Kombinasyonları ve banko seçeneklerini hesapla
         const combinations = this.calculateCombinations(this.ActiveCoupon, parseInt(combinationType.split('/')[0]));
         combinations.forEach(combination => {
             let combinationOdds = 1; // Banko seçenekler için başlangıç değeri
             // Kombinasyonda her bir maç için
             combination.forEach(match => {
                 // Eğer banko ise, oranı direkt çarp
                 if (match.isBanko) {
                     combinationOdds *= parseFloat(match.oddValue);
                 } else {
                     // Banko değilse, maçtaki maksimum oranı bul ve çarp
                     let maxOdd = Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)));
                     combinationOdds *= maxOdd;
                 }
             });
             totalWin += combinationOdds * this.betAmount; // Toplam kazancı hesapla
         });
         return totalWin;
     }*/
    calculateCouponCounts() {
        const couponCounts = {
            single: 0,
            multi: 0,
            system: 0
        };

        // Single kupon sayısını hesapla
        this.ActiveCoupon.forEach(match => {
            couponCounts.single += match.outComes.length;
        });


        if (this.ActiveCoupon.length > 1) { // En az iki maç olmalı
            couponCounts.multi = this.ActiveCoupon.reduce((acc, match) => acc * match.outComes.length, 1);
        }

        // System kupon sayısı, daha karmaşık bir hesaplama gerektirir
        // Basit bir örnek olarak, her maç için en az iki outcome varsa bir sistem kuponu oluşturulabilir
        if (this.ActiveCoupon.every(match => match.outComes.length >= 2)) {
            couponCounts.system = this.calculateSystemCouponCount();
        }

        return couponCounts;
    }

    calculateSystemCouponCount() {
        return this.ActiveCoupon.reduce((count, match) => count * match.outComes.length, 1);
    }

    /* calculateCouponTypes() {
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
      }*/
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
                ticketAmount += this.betAmount * detail.count;
                ticketPossibleWin += parseFloat(detail.possibleWin);
                if (detail.isWin) {
                    ticketWins += parseFloat(detail.possibleWin);
                } else {
                    ticketLoses += this.betAmount * detail.count;
                }
            }

            if (selection === "combinations") {
                console.log(betResults.details)
                Object.keys(betResults.details.combinations).forEach(combinationType => {
                    const combinationDetail = betResults.details.combinations[combinationType];
                    console.log(combinationDetail)
                    bets += combinationDetail.count;
                    ticketAmount += this.betAmount * combinationDetail.count;
                    ticketPossibleWin += parseFloat(combinationDetail.possibleWin);
                    if (combinationDetail.isWin) {
                        ticketWins += parseFloat(combinationDetail.possibleWin);
                    } else {
                        ticketLoses += this.betAmount * combinationDetail.count;
                    }

                    // Ek olarak, combinationType içindeki her bir kombinasyonun detayını da işleyelim:
                    combinationDetail.details.forEach(comboDetail => {
                        ticketSize += comboDetail.count;
                        ticketAmount += this.betAmount * comboDetail.count;
                        ticketPossibleWin += parseFloat(comboDetail.possibleWin);
                        if (comboDetail.isWin) {
                            ticketWins += parseFloat(comboDetail.possibleWin);
                        } else {
                            ticketLoses += this.betAmount * comboDetail.count;
                        }
                    });
                });
            }
        });

        return {
            bets,
            ticketSize,
            ticketAmount: parseFloat(ticketAmount.toFixed(2)),
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
                const reduction = this.getReductionForOdds(outcome.oddValue, match.competition.isLive);
                totalCashout += (outcome.oddValue * this.betAmount) * (reduction / outcome.oddValue);
            }
        }
        return totalCashout;
    }

    calculateTypeCashout(type, stake) {
        const totalOdds = this.calculateTotalRates(type);
        const reduction = this.getReductionForOdds(totalOdds);
        const potentialWin = this.calculatePossibleWin(type).potentialWin;
        // Cashout formülünü uyguluyoruz.
        return (potentialWin * stake) * (reduction / totalOdds);
    }

    updateTotalPossibleWinning(page = "non") {
        this.totalPossibleWinning = parseFloat(this.calculateWinningMoney("updateTotalPossibleWinning").toFixed(2));
    }

    q() {
        console.warn(JSON.stringify(this.ActiveCoupon))
        console.log(JSON.stringify(this.calculateBetResults(), null, 2))
        console.log(JSON.stringify(this.calculateSelectionOutcome(), null, 2))
    }

    calculateTotalCashout() {
        let totalCashout = 0;
        this.currentSelections.forEach(selection => {
            if (selection === 'single' || selection === 'combi') {
                totalCashout += BET.calculateBetResults().details[selection].cashout;
            }
        });
        if (BET.currentSelections.includes('combinations')) {
            Object.values(BET.calculateBetResults().details.combinations).forEach(combination => {
                totalCashout += combination.cashout || 0; // Eğer cashout değeri null ise, 0 olarak hesapla
            });
        }

        return totalCashout;
    }

    summary() {
        const sum = this.calculateTicketSummary();
        const result = this.calculateTicketSummary();
        return {
            bets: sum.bets,
            loses: sum.ticketLoses,
            wins: sum.ticketWins,
            maxWin: sum.ticketPossibleWin,
            offer: sum.ticketPossibleWin,
        }
    }

    calculateSelectionOutcome() {
        let totalWin = 0;
        let isWinTicket = false;
        const calculateOutcomeCounts = (matches) => {
            let winCount = 0; // Kazanan bahislerin sayısı
            let totalCount = 0; // Toplam bahis sayısı

            matches.forEach(match => {
                winCount += match.outComes.filter(outcome => outcome.result === "Won").length;
                totalCount += match.outComes.length;
            });

            return { winCount, totalCount };
        }
        const tickets = this.currentSelections.map(selection => {
            let winAmount = 0;
            let loseAmount = 0;

            if (selection === "single") {
                const { winCount, totalCount } = calculateOutcomeCounts(this.ActiveCoupon);
                this.ActiveCoupon.forEach(match => {
                    if (match.outComes.some(outcome => outcome.result === "Won")) {
                        winAmount += match.outComes.reduce((sum, outcome) => sum + parseFloat(outcome.oddValue), 0) * this.betAmount;
                    } else {
                        loseAmount += this.betAmount;
                    }
                });
            } else if (selection === "combi") {
                const totalOdds = this.ActiveCoupon.reduce((total, match) => {
                    return total * match.outComes.reduce((product, outcome) => product * parseFloat(outcome.oddValue), 1);
                }, 1);
                if (this.ActiveCoupon.every(match => match.outComes.some(outcome => outcome.result === "Won"))) {
                    winAmount = totalOdds * this.betAmount;
                } else {
                    loseAmount = this.betAmount;
                }
            } else if (/^\d+\/\d+$/.test(selection)) {
                const [minWinning, totalSelections] = selection.split('/').map(Number);
                const combinations = this.getCombinations(this.ActiveCoupon, minWinning);
                combinations.forEach(combination => {
                    let combinationWin = true;
                    let combinationOdds = 1;

                    combination.forEach(match => {
                        let matchWin = false;
                        match.outComes.forEach(outcome => {
                            if (outcome.result === "Won") {
                                matchWin = true;
                                combinationOdds *= parseFloat(outcome.oddValue);
                            }
                        });

                        if (!matchWin) {
                            combinationWin = false;
                        }
                    });

                    if (combinationWin) {
                        winAmount += combinationOdds * this.betAmount;
                    } else {
                        loseAmount += this.betAmount;
                    }
                });
            }

            totalWin += winAmount;
            if (winAmount > 0) {
                isWinTicket = true;
            }

            return {
                selection: selection,
                count: this.ActiveCoupon.length,
                winAmount: winAmount,
                loseAmount: loseAmount
            };
        });

        return {
            totalWin: totalWin,
            isWinTicket: isWinTicket,
            tickets: tickets
        };
    }

    /*getCombinations(array, size) {
        function* doCombination(offset, combo) {
            if (combo.length === size) {
                yield combo;
                return;
            }
            for (let i = offset; i < array.length; i++) {
                yield* doCombination(i + 1, combo.concat(array[i]));
            }
        }
        return Array.from(doCombination(0, []));
    }*/


    generateOutcomeCombinationsAndTotal(combinationParam) {
        function getCombinations(array, size) {
            function* doCombination(offset, combo) {
                if (combo.length === size) {
                    yield combo;
                    return;
                }
                for (let i = offset; i < array.length; i++) {
                    yield* doCombination(i + 1, combo.concat(array[i]));
                }
            }

            return Array.from(doCombination(0, []));
        }

        const allOutcomes = this.ActiveCoupon.flatMap(match =>
            match.outComes.map(outcome => ({
                ...outcome,
                matchId: match.matchId
            }))
        );
        const [comboSize] = combinationParam.split('/').map(Number);
        const allCombinations = getCombinations(allOutcomes, comboSize);

        const validCombinations = allCombinations.filter(combo =>
            new Set(combo.map(outcome => outcome.matchId)).size === combo.length
        );

        let pay = 0;
        const odds = []
        // q(validCombinations)
        validCombinations.map(combo => {
            const product = combo.reduce((acc, odd) => acc * (parseFloat(odd.oddValue) * Number(odd.result === "Won")), 1);
            pay += product;

        });

        return {
            odds: validCombinations,
            pay
        };
    }

    bankoMatrix(combinationType) {
        const calculateOddsAndTotal = (matrix) => {
            const odds = matrix.map(combination =>
                combination.reduce((acc, outcome) => (acc * (outcome.oddValue * (Number(outcome.result === "Won")))), 1)
            );
            const total = odds.reduce((acc, odd) => acc + odd, 0);
            return { odds, total };
        }
        const getCombinations = (array, size) => {
            function* doCombination(offset, combo) {
                if (combo.length === size) {
                    yield combo;
                } else {
                    for (let i = offset; i < array.length; i++) {
                        yield* doCombination(i + 1, [...combo, array[i]]);
                    }
                }
            }

            return Array.from(doCombination(0, []));
        }
        const [pickCount] = combinationType.split('/').map(Number);
        const bankoMatches = this.ActiveCoupon
            .filter(match => match.outComes.some(outcome => outcome.isBanko))
            .flatMap(match => match.outComes.filter(outcome => outcome.isBanko));
        const nonBankoMatches = this.ActiveCoupon
            .filter(match => match.outComes.every(outcome => !outcome.isBanko))
            .flatMap(match => match.outComes);
        const combinations = getCombinations(nonBankoMatches, pickCount - bankoMatches.length);
        const matrix = combinations.map(combination => [...bankoMatches, ...combination].map(outcome => ({
            outComeId: outcome.outComeId,
            oddValue: outcome.oddValue,
            marketId: outcome.marketId,
            marketName: outcome.marketName,
            isBanko: outcome.isBanko || false,
            result: outcome.result || null
        })));

        return { "odds": matrix, total: calculateOddsAndTotal(matrix) };
    }

    bankoSystem(combinationSize) {
        const fx = [];
        let oddsSelection = []
        const combinationsSubset = (array, subsetSize) => {
            function combine(start, subset) {
                if (subset.length === subsetSize) {
                    combinations.push([...subset]);
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    combine(i + 1, [...subset, array[i]]);
                }
            }

            let combinations = [];
            combine(0, []);
            return combinations;
        }
        let bankoOdds = [];
        let bankoXID = [];
        let nonBankoMatches = [];
        let nonBankoMatches2 = [];
        let oddMap = [];
        const bankoArray = this.ActiveCoupon.flatMap(match =>
            match.outComes
                .filter(outcome => outcome.isBanko === true)
                .map(outcome => ({
                    ...outcome,
                    matchId: match.matchId
                })));
        const nonBankoArray = this.ActiveCoupon.flatMap(match =>
            match.outComes
                .filter(outcome => !outcome.isBanko)
                .map(outcome => ({
                    ...outcome,
                    matchId: match.matchId
                })));
        this.ActiveCoupon.forEach(match => {
            const bankoOutcome = match.outComes.find(outcome => outcome.isBanko);
            if (bankoOutcome) {
                bankoOdds.push(parseFloat(bankoOutcome.oddValue));
                const xid = match.matchId + '#' + bankoOutcome.marketId + ':' + bankoOutcome.outComeId + ":" + Number(bankoOutcome.result === "Won")
                bankoXID.push({ [xid]: parseFloat(bankoOutcome.oddValue) });
            } else {
                let outcomesByMarket = match.outComes.reduce((acc, outcome) => {
                    const marketId = outcome.marketId;
                    const oddValue = parseFloat(outcome.oddValue);
                    const outcomeId = outcome.outComeId;
                    const xid = marketId + '?' + outcomeId;
                    if (!acc[marketId] || acc[marketId] < oddValue) {
                        acc[marketId] = oddValue;
                    }
                    return acc;
                }, {});
                nonBankoMatches.push(...Object.values(outcomesByMarket).map(oddValue => {
                    return oddValue;
                }));
                let outcomesByMarket2 = match.outComes.reduce((acc2, outcome) => {
                    const marketId = outcome.marketId;
                    const matchId = match.matchId;
                    const oddValue = parseFloat(outcome.oddValue);
                    const outcomeId = outcome.outComeId;
                    const xid = matchId + '#' + marketId + ':' + outcomeId + ":" + Number(outcome.result === "Won");
                    if (!acc2[marketId] || acc2[marketId] < oddValue) {
                        acc2[xid] = oddValue;
                    }
                    return acc2;
                }, {});
                nonBankoMatches2.push(outcomesByMarket2);
            }
        });
        let combinations = combinationsSubset(nonBankoMatches, combinationSize - bankoOdds.length);
        let combinations2 = combinationsSubset(nonBankoMatches2, combinationSize - bankoOdds.length);
        let totalTickets = combinations.length;
        let possibleWin = combinations.reduce((acc, combination) => {
            if (!Array.isArray(bankoOdds) || !bankoOdds.length) {
                return acc;
            }
            let bankoProduct = bankoOdds.reduce((product, odd) => {
                return product * odd;
            }, 1);
            return acc + combination.reduce((product, odd) => product * odd, bankoProduct);
        }, 0);
        let oddsInCombinations = combinations.map(combination => {
            return [...combination, ...bankoOdds]
        });


        let pay = 0;
        let oddsIntoCombinations = combinations2.map(combination => {
            if (!combination || typeof combination !== 'object') {
                console.error('Invalid combination structure', combination);
                return [];
            }
            let keys = Object.keys(combination);
            if (!keys.length) {
                console.error('Combination has no keys', combination, combinationSize);
                fx.push({
                    'process': 'unavailable',
                    'turn': combinationSize,
                    "outcomes": [...new Set(nonBankoMatches2.flatMap(object => Object.keys(object).map(key => key.split('#')[0])))]
                });
                oddsSelection = bankoArray
                return [];
            }
            let x = keys[0];
            let odd = combination[x];
            if (!bankoXID.length) {
                console.error('bankoXID is empty or not an array');
                return [];
            }
            let bankoOdd = Object.values(bankoXID[0])[0];
            const isWin = x.split(':')[x.split(':').length - 1] === '1' ? 1 : 0;
            pay = (odd * bankoOdd * isWin) + pay;
            return [...combination, ...bankoXID];
        });

        return {
            possibleWin,
            count: totalTickets,
            combinations: combinations.map(comb => comb.map(odd => ({ oddValue: odd }))),
            oddsInCombinations,
            oddsIntoCombinations,
            pay,
            oddsSelection,
            fx
        };
    }

    T1(data, combinationSize) {
        const combinationsSubset = (array, subsetSize) => {
            function combine(start, subset) {
                if (subset.length === subsetSize) {
                    combinations.push([...subset]);
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    combine(i + 1, [...subset, array[i]]);
                }
            }

            let combinations = [];
            combine(0, []);
            return combinations;
        }

        let bankoOdds = [];
        let nonBankoOutcomes = [];
        data.forEach(match => {
            match.outComes.forEach(outcome => {
                if (outcome.isBanko) {
                    bankoOdds.push(parseFloat(outcome.oddValue));
                } else {
                    nonBankoOutcomes.push({
                        oddValue: parseFloat(outcome.oddValue),
                        matchId: match.matchId,
                        marketId: outcome.marketId,
                        outComeId: outcome.outComeId,
                        isBanko: outcome.isBanko
                    });
                }
            });
        });
        let combinationOutcomes = combinationsSubset(nonBankoOutcomes, combinationSize - bankoOdds.length);
        let total = combinationOutcomes.reduce((acc, combination) => {
            let combinationProduct = combination.reduce((product, outcome) => product * outcome.oddValue, 1);
            let bankoProduct = bankoOdds.reduce((product, odd) => product * odd, 1);
            return acc + combinationProduct * bankoProduct;
        }, 0);

        return {
            odds: combinationOutcomes.map(combination => combination.map(outcome => ({
                matchId: outcome.matchId,
                marketId: outcome.marketId,
                outComeId: outcome.outComeId,
                oddValue: outcome.oddValue
            }))),
            total: total
        };
    }

    bankoTotalMoney(comboSize) {
        function getCombinations(array, size) {
            function* doCombination(offset, combo) {
                // Eğer combo'nun uzunluğu size'a eşitse veya combo içinde banko bir eleman varsa ve combo'nun uzunluğu 1'den büyükse
                if (combo.length === size || (combo.some(item => item.isBanko) && combo.length > 1)) {
                    yield combo;
                    return;
                }
                for (let i = offset; i < array.length; i++) {
                    // Eğer şu anki eleman banko ise ve combo zaten bir banko eleman içeriyorsa, bu elemanı atla
                    if (array[i].isBanko && combo.some(item => item.isBanko)) {
                        continue;
                    }
                    yield* doCombination(i + 1, combo.concat(array[i]));
                }
            }

            return Array.from(doCombination(0, []));
        }

        const allOutcomes = this.ActiveCoupon.flatMap(match =>
            match.outComes.map(outcome => ({
                ...outcome,
                matchId: match.matchId
            }))
        );

        const allCombinations = getCombinations(allOutcomes, comboSize);

        const validCombinations = allCombinations.filter(combo =>
            new Set(combo.map(outcome => outcome.matchId)).size === combo.length
        );
        let pay = 0;
        const odds = []
        validCombinations.map(combo => {
            const product = combo.reduce((acc, odd) => acc * (parseFloat(odd.oddValue) * Number(odd.result === "Won")), 1);
            pay += product;

        });
        return {
            odds: validCombinations,
            pay
        };
    }

    TicketSIZEBanko(picker) {
        const dArray = [];
        const convertDataToTicketArray = () => {
            const ticketArray = [];
            this.ActiveCoupon.forEach(coupon => {
                coupon.outComes.forEach(outCome => {
                    const isBanko = outCome.isBanko ? 1 : 0;
                    dArray.push([outCome, coupon.matchId, isBanko]);
                    ticketArray.push([parseFloat(outCome.oddValue), coupon.matchId, isBanko]);
                });
            });
            return { ticketArray, dArray };
        }
        const uniquer = (ticketArray) => {
            const matchUniqueArray = [];
            const index = [];
            const freq = [];
            ticketArray.forEach((row) => {
                const indexInUniqueArray = matchUniqueArray.indexOf(row[1]);
                if (indexInUniqueArray === -1) {
                    matchUniqueArray.push(row[1]);
                    index.push(row);
                    freq.push(1);
                } else {
                    freq[indexInUniqueArray]++;
                }
            });

            const newMatrix = index.map((row, idx) => [...row, freq[idx]]);
            const matchCount = newMatrix.length;

            return [newMatrix, matchCount];

        }
        const bankCounting = (newMatrix) => {
            let bankCount = 0;
            const bankIndex = [];

            newMatrix.forEach((row, idx) => {
                if (row[2] === 1) {
                    bankCount++;
                    bankIndex.push(idx);
                }
            });

            return [bankCount, bankIndex];
        }
        const combinations = (arr, k) => {
            const result = [];

            function backtrack(start, current) {
                if (current.length === k) {
                    result.push([...current]);
                    return;
                }

                for (let i = start; i < arr.length; i++) {
                    current.push(arr[i]);
                    backtrack(i + 1, current);
                    current.pop();
                }
            }

            backtrack(0, []);
            return result;
        }
        const combining = (bankCount, newMatrix) => {
            const arr = newMatrix.slice(bankCount).map(row => row[3]);
            const combinationsDict = {};

            for (let r = 1; r <= arr.length; r++) {
                const combList = combinations(arr, r);
                for (const comb of combList) {
                    const key = comb.length;
                    const product = comb.reduce((acc, curr) => acc * curr, 1);
                    if (key in combinationsDict) {
                        combinationsDict[key] += product;
                    } else {
                        combinationsDict[key] = product;
                    }
                }
            }

            return [combinationsDict, arr];
        }
        const main = (data, picker) => {
            const tarr = convertDataToTicketArray(data).ticketArray;
            const sArr = convertDataToTicketArray(data).dArray;

            const [newMatrix, matchCount] = uniquer(tarr);
            const [newMatrixed, matchCounted] = uniquer(tarr);
            const [bankCount, bankIndex] = bankCounting(newMatrix);
            const [combinationsDict, arr] = combining(bankCount, newMatrix);

            const rArr = Object.fromEntries(Object.entries(combinationsDict).map(([key, value]) => [parseInt(key) + bankCount, value]));

            return rArr[picker];
        }
        return main(this.ActiveCoupon, picker);
    }

    TicketSIZE(picker) {
        const convertDataToTicketArray = () => {
            const ticketArray = [];
            this.ActiveCoupon.forEach(coupon => {
                coupon.outComes.forEach(outCome => {
                    const isBanko = outCome.isBanko ? 1 : 0;
                    ticketArray.push([parseFloat(outCome.oddValue), coupon.matchId, isBanko]);
                });
            });

            return ticketArray;
        }
        const uniquer = (ticketArray) => {
            const matchUniqueArray = [];
            const index = [];
            const freq = [];
            ticketArray.forEach((row) => {
                const indexInUniqueArray = matchUniqueArray.indexOf(row[1]);
                if (indexInUniqueArray === -1) {
                    matchUniqueArray.push(row[1]);
                    index.push(row);
                    freq.push(1);
                } else {
                    freq[indexInUniqueArray]++;
                }
            });

            const newMatrix = index.map((row, idx) => [...row, freq[idx]]);
            const matchCount = newMatrix.length;

            return [newMatrix, matchCount];

        }
        const bankCounting = (newMatrix) => {
            let bankCount = 0;
            const bankIndex = [];

            newMatrix.forEach((row, idx) => {
                if (row[2] === 1) {
                    bankCount++;
                    bankIndex.push(idx);
                }
            });

            return [bankCount, bankIndex];
        }
        const combinations = (arr, k) => {
            const result = [];

            function backtrack(start, current) {
                if (current.length === k) {
                    result.push([...current]);
                    return;
                }

                for (let i = start; i < arr.length; i++) {
                    current.push(arr[i]);
                    backtrack(i + 1, current);
                    current.pop();
                }
            }

            backtrack(0, []);
            return result;
        }
        const combining = (bankCount, newMatrix) => {
            const arr = newMatrix.slice(bankCount).map(row => row[3]);
            const combinationsDict = {};


            for (let r = 1; r <= arr.length; r++) {
                const combList = combinations(arr, r);
                for (const comb of combList) {
                    const key = comb.length;
                    const product = comb.reduce((acc, curr) => acc * curr, 1);
                    if (key in combinationsDict) {
                        combinationsDict[key] += product;
                    } else {
                        combinationsDict[key] = product;
                    }
                }
            }

            return [combinationsDict, arr];
        }
        const main = (data, picker) => {
            const tarr = convertDataToTicketArray(data);
            const [newMatrix, matchCount] = uniquer(tarr);
            const [bankCount, bankIndex] = bankCounting(newMatrix);
            const [combinationsDict, arr] = combining(bankCount, newMatrix);

            const rArr = Object.fromEntries(Object.entries(combinationsDict).map(([key, value]) => [parseInt(key) + bankCount, value]));
            return rArr[picker];
        }
        return main(this.ActiveCoupon, picker);
    }

    winMoney(picker = false) {
        const ticketArray = this.ActiveCoupon.flatMap(match =>
            match.outComes.map(outCome => [
                outCome.outComeId + match.matchId,
                parseFloat(outCome.oddValue),
                outCome.isBanko ? 1 : 0,
                outCome.result === "Won" ? 1 : 0
            ])
        );
        let resultDict = {};
        ticketArray.forEach(row => {
            const key = row[0];
            if (resultDict.hasOwnProperty(key)) {
                resultDict[key] = resultDict[key].map((value, index) => value * row[index + 1]);
            } else {
                resultDict[key] = row.slice(1);
            }
        });
        const uniqueArray = Object.entries(resultDict).map(([key, values]) => [parseInt(key)].concat(values));
        let matchCount = uniqueArray.length;
        let bankCount = 0;
        let differentOutcome = 0;
        let bankIndex = [];
        let fRatio = [];
        uniqueArray.forEach((item, index) => {
            fRatio.push(item[3] * item[1]);
            if (item[2] === 1) {
                bankCount++;
                bankIndex.push(index);
            }
            if (item[3] > 1) {
                differentOutcome++;
            }
        });

        let combs1 = [];
        let bankRatio = [];
        bankIndex.forEach(index => {
            combs1.push(uniqueArray[index][4]);
            bankRatio.push(uniqueArray[index][1]);
        });
        let bankRatios = bankRatio.reduce((acc, cur) => acc * cur, 1);
        let head = combs1.reduce((acc, cur) => acc * cur, 1);
        let arr = fRatio.slice(bankCount);

        function generateCombinations(arr) {
            let result = [];
            const f = function (prefix = [], arr = []) {
                for (let i = 0; i < arr.length; i++) {
                    result.push([...prefix, arr[i]]);
                    f([...prefix, arr[i]], arr.slice(i + 1));
                }
            };
            f([], arr);
            return result;
        }

        let combinations = generateCombinations(arr);
        const rc = {}
        combinations.forEach((comb, index) => {
            let product = comb.reduce((acc, cur) => acc * cur, 1) * bankRatios;
            let r = arr.length;
            let notation = `C(${r + bankCount},${comb.length + bankCount})`;
            const key = (comb.length + bankCount) + "/" + (r)
            if (!rc[key]) rc[key] = 0;
            rc[key] += parseFloat(product.toFixed(2));
        });
        return !picker ? rc : rc[picker]
    }

    calculateTotalTicketsForType(combinationSize, totalMatches) {
        const outcomesPerMatch = this.ActiveCoupon.map(match => match.outComes.length);
        let totalTickets = 0;
        const matchCombinations = this.getCombinations(Array.from({ length: totalMatches }).map((_, i) => i + 1), combinationSize);
        matchCombinations.forEach(combination => {
            const outcomeCombinations = combination.reduce((acc, matchIndex) => {
                return acc * outcomesPerMatch[matchIndex - 1]
            }, 1);
            totalTickets += outcomeCombinations;
        });
        return totalTickets;
    }

    calculateBets(system) {
        let bets = 0;
        const bankoMatchIndex = this.ActiveCoupon.findIndex((coupon) => coupon.outComes[0].isBanko);
        if (bankoMatchIndex !== -1) {
            const bankoMatchOdd = this.ActiveCoupon[bankoMatchIndex].outComes[0].oddValue;
            const nonBankoMatches = this.ActiveCoupon.filter((coupon, i) => i !== bankoMatchIndex).map((coupon) => ({
                oddValue: coupon.outComes[0].oddValue,
            }));
            const numSelections = parseInt(system.split("/")[0]);
            if (numSelections > nonBankoMatches.length) {
                return 0;
            }

            function calculateCombinations(matches, selected, currentOdd, depth) {
                if (depth === numSelections) {
                    bets += currentOdd * bankoMatchOdd;
                    return;
                }
                for (let i = selected; i < matches.length; i++) {
                    calculateCombinations(matches, i + 1, currentOdd * matches[i].oddValue, depth + 1);
                }
            }

            calculateCombinations(nonBankoMatches, 0, 1.0, 0);
        }
        return bets;
    }

    transformed(data) {
        return data.map(group => {
            const odds = [];
            const ids = [];
            let total = 1;
            group.forEach(item => {
                Object.entries(item).forEach(([key, value]) => {
                    const [marketId, outcomeId, isWin] = key.split("#").pop().split(":");
                    const matchId = key.split("#")[0];
                    ids.push({ matchId, marketId, outcomeId, isWin });
                    total *= (value * isWin);
                    odds.push(value);
                });
            });
            total = parseFloat(total.toFixed(2));
            return { odds, ids, total };
        });
    }

    calculateCombinationsWithoutBanko(combinationSize) {
        const self = this;
        const combinationsSubset = (array, subsetSize) => {
            function combine(start, subset) {
                if (subset.length === subsetSize) {
                    combinations.push([...subset]);
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    combine(i + 1, [...subset, array[i]]);
                }
            }

            let combinations = [];
            combine(0, []);
            return combinations;
        };

        let outcomes = [];
        let selections = [];
        let pay = 0;
        this.ActiveCoupon
            .forEach(match => {
                let outcomesByMarket = {};
                let outcomesBySelections = {}
                match.outComes.forEach(outcome => {

                    const marketId = outcome.marketId;
                    selections.push(outcome);

                    if (!outcomesByMarket[marketId] || parseFloat(outcomesByMarket[marketId].oddValue) < parseFloat(outcome.oddValue)) {
                        outcomesByMarket[marketId] = outcome;
                    }
                });
                outcomes.push(...Object.values(outcomesByMarket));

            });

        let combinations = combinationsSubset(outcomes, combinationSize);
        let combinationsSelector = combinationsSubset(selections, combinationSize);
        let totalTickets = this.calculateTotalTicketsForType(combinationSize, this.ActiveCoupon.length);
        let possibleWin = combinations.reduce((acc, combination) => {
            return acc + combination.reduce((product, outcome) => product * parseFloat(outcome.oddValue), 1);
        }, 0);

        let oddsInCombinations = combinations.map(combination => combination.map(outcome => {
            return parseFloat(outcome.oddValue)
        }));

        combinations.map(function (outcomes) {
            let payout = 0;
            outcomes.forEach(function (x) {
                payout = payout + ((parseFloat(x.oddValue * self.betAmount)) * Number(x.result === "Won"))
            })
            pay += payout;
        });
        return {
            possibleWin,
            count: totalTickets,
            combinations: combinations.map(comb => comb.map(outcome => ({
                marketId: outcome.marketId,
                oddValue: outcome.oddValue
            }))),
            oddsInCombinations,
            pay
        };
    }

    calculateCombinationsWithHighestOdds(k) {
        const result = {
            combinations: [],
            selectedOutcomes: [],
            totalTickets: 0
        };
        const processedMatches = this.ActiveCoupon.map(match => ({
            ...match,
            outComes: Object.values(match.outComes.reduce((acc, outcome) => {
                const marketId = outcome.marketId;
                if (!acc[marketId] || acc[marketId].oddValue < outcome.oddValue) {
                    acc[marketId] = outcome;
                }
                return acc;
            }, {}))
        }));

        // Kombinasyonları hesapla
        function combine(selectedMatches, startIndex) {
            if (selectedMatches.length === k) {
                result.combinations.push([...selectedMatches]);
                result.totalTickets += 1;
                return;
            }
            for (let i = startIndex; i < processedMatches.length; i++) {
                combine([...selectedMatches, processedMatches[i]], i + 1);
            }
        }

        combine([], 0);
        result.selectedOutcomes = processedMatches.flatMap(match => match.outComes.map(outcome => ({
            matchId: match.matchId,
            marketId: outcome.marketId,
            oddValue: outcome.oddValue,
            isBanko: outcome.isBanko || false
        })));
        return result;
    }

    calculateCombinations2(matches, k) {
        const combinations = [];
        const combine = (start, chosenMatches) => {
            if (chosenMatches.length === k) {
                combinations.push([...chosenMatches]);
                return;
            }
            for (let i = start; i < matches.length; i++) {
                const match = matches[i];
                const selectedOutcome = match.outComes.find(outcome => !outcome.isBanko);
                if (selectedOutcome) {
                    const updatedChosenMatches = [...chosenMatches, { ...match, outComes: [selectedOutcome] }];
                    combine(i + 1, updatedChosenMatches);
                }
            }
        };

        combine(0, []);

        return combinations;
    }

    calculateHighestWinForCombinations() {
        let results = {};
        this.currentSelections.forEach(selection => {
            const [pick, outOf] = selection.split('/').map(Number);
            const combinations = this.calculateCombinations(this.ActiveCoupon, pick);
            let highestWin = 0;
            combinations.forEach(combination => {
                let totalOdds = 1;
                combination.forEach(match => {
                    const bankoOutcome = match.outComes.find(outcome => outcome.isBanko);
                    if (bankoOutcome) {
                        totalOdds *= parseFloat(bankoOutcome.oddValue);
                    } else {

                        const maxOdd = Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)));
                        totalOdds *= maxOdd;
                    }
                });
                highestWin = Math.max(highestWin, totalOdds);
            });
            results[selection] = highestWin;
        });
        return results;
    }

    calculateCombinationWins(combinationType) {
        let totalWin = 0;
        const combinationSize = parseInt(combinationType.split('/')[0]);
        const nonBankoMatches = this.ActiveCoupon.filter(match => !match.outComes.some(outcome => outcome.isBanko));
        const bankoOdds = this.ActiveCoupon
            .filter(match => match.outComes.some(outcome => outcome.isBanko))
            .reduce((product, match) => product * Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue))), 1);
        const combinations = this.calculateCombinations(nonBankoMatches, combinationSize);
        combinations.forEach(combination => {
            let combinationOdds = 1;
            combination.forEach(match => {
                const maxOdd = Math.max(...match.outComes.map(outcome => parseFloat(outcome.oddValue)));
                combinationOdds *= maxOdd;
            });
            totalWin += combinationOdds;
        });
        return totalWin * bankoOdds * this.betAmount;
    }

    getCombinations(oddsList, combinationLength) {
        const combinations = [];
        const generateCombinations = (start, combination) => {
            if (combination.length === combinationLength) {
                combinations.push([...combination]);
                return;
            }
            for (let i = start; i < oddsList.length; i++) {
                generateCombinations(i + 1, [...combination, oddsList[i]]);
            }
        };
        generateCombinations(0, []);
        return combinations;
    }

    allOutcomes() {
        return this.ActiveCoupon.reduce((acc, coupon) => {
            const updatedOutComes = coupon.outComes.map(outcome => ({
                ...outcome,
                matchId: coupon.matchId,
                result: outcome.result
            }));
            acc.push(...updatedOutComes);
            return acc;
        }, []);
    }

    calculateCouponTypes() {
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        // const calculateCombinations = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));

        const totalMatches = this.ActiveCoupon.reduce((total, match) => total + match.outComes.length, 0);
        const bankoMatches = this.ActiveCoupon.filter(match => match.isBanko).length;
        const nonBankoMatches = this.ActiveCoupon.length - bankoMatches;
        const couponTypes = {
            combi: this.ActiveCoupon.length > 0 ? 1 : 0,
            single: totalMatches,
            combinations: {}
        };
        for (let k = 2; k <= nonBankoMatches + bankoMatches; k++) {
            const combinationsWithoutBanko = this.calculateCombinations(nonBankoMatches, k - bankoMatches);
            couponTypes.combinations[`${k}/${this.ActiveCoupon.length}`] = combinationsWithoutBanko;
        }

        return couponTypes;
    }

    filtered(mM = "max") {
        return FUNC.compareData(FUNC.outcomeRiskGroup(this.ActiveCoupon), mM)
    }


}


class V_APP {

    constructor() { }
}

class LANGS {
    constructor() {
        this.l = app.lang;
    }

    async OPTLANGS(selectedLang = 'en') {
        selectedLang = selectedLang.toLowerCase()
        if (!_V.LANG_LIST) return;
        var htm = '', checked;

        await Promise.all(Object.keys(_V.LANG_LIST).map(async (m) => {
            if (_V.LANG_LIST[m].active) {
                checked = selectedLang === m ? 'checked' : '';
                htm += ' <li class="list-item nopli"> <div class="row"><div class="col-auto"><i class="flag flag-48 flag-' + m + '"></i></div><div class="col"> <h5 class="no-margin-bottom">' + _V.LANG_LIST[m].name + '</h5> <p class="text-muted small cutof">' + _V.LANG_LIST[m].text + '</p></div> <div class="col-auto"> <label class="toggle toggle-init color-green" > <input onclick="FUNC.toggleOF(this,\'' + m + '\')" type="checkbox" ' + checked + '/> <span class="toggle-icon"></span> </label> </div></div></li>';

                // htm += '<li class=""> <h6 class="text-dark no-margin"><i class="flag flag-48 flag-' + m + '"></i> <span class="pt16">' + _V.LANG_LIST[m].name + '</span> <br><small class="text-secondary">' + _V.LANG_LIST[m].text + '</small></h6> <label class="toggle toggle-init color-green LANGSLC" onclick="FUNC.toggleOF(this,\'' + m + '\')"> <input ' + checked + ' type="checkbox"> <span class="toggle-icon"></span> </label> </li>';
            }
        }));
        return htm;
    }

    async getLoad() {
        var lang = await this.take(window.lang.general.code);
        var jsonla = LANG_LIST[lang.code];
        $('.loadedLANG').html(jsonla.name);
        $('.loadedFlg').html('<span class="flag flag-32 ' + jsonla.flag + '"></span>');
    }

    async take(lang) {
        if (lang && Object.keys(LANG_LIST).includes(lang)) {
            return this.get(lang);
        } else return this.get('en');
    }

    async get() {
        return 'en';
        var lang = document.location.href.split('/lang/')[1] ? document.location.href.split('/lang/')[1].replace('/', '') : 'en';

        if (!Object.keys(LANG_LIST).includes(lang)) lang = 'en';
        if (sessionStorage.getItem('LANG')) {
            app.lang = sessionStorage.getItem('LANG');
            if (lang && window.mylang === lang) {
                return LANG_LIST[app.lang];
            } else if (lang && Object.keys(LANG_LIST).includes(lang)) {
                console.log("get-set", lang)
                return this.set(lang);
            } else return this.set('en');

        } else {
            app.lang = 'en';
            return LANG_LIST['en']
        }
    }

    set(lang = 'en') {

        if (LANG_LIST[lang]) {
            sessionStorage['LANG'] = lang
            app.lang = lang;
            return lang;
        } else {
            sessionStorage.setItem('LANG', 'en');
            app.lang = 'en';
            return 'en';
        }

    }

    async load() {
        _L = await (await fetch('./js/lang/' + app.lang + '-client.json')).json();
        return _L;
    }

    formatLang(str, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
        //if (str) return str.replace(/\{\{|}}|\{(\w+)}/g, function (m, n) {
        if (str) return str.replace(/{(.*?)}/g, function (m, n) {
            if (m == "{{") {
                return "{";
            }
            if (m == "}}") {
                return "}";
            }
            if (n.split('.').length === 1) {
                return col[n];
            } else {
                var s = col;
                n.split('.').forEach(function (v) {
                    if (s[v]) s = s[v]
                });
                return s;
            }

        });
    }

    actions(detail, params = '') {
        return lang.ACTIONS && lang.ACTIONS[detail] ? LANG.formatLang(lang.ACTIONS[detail], params) : detail;
    }

    convert(path, params) {
        return this.formatLang(path.split('.').reduce((_L, c) => _L && _L[c] || null, _L), params)
    }

}

class USERS {
    constructor() {
    }

    Risk(req) {

        const checkIt = (req) => {
            let criteria = req.criteria;
            let riskGroup = _V.USER.filters.hasOwnProperty("riskGroup") ? _V.USER.filters["riskGroup"] : {};

            let riskId = riskGroup.id;

            let specials = riskGroup.hasOwnProperty("specials") ? _V.USER.filters.riskGroup["specials"] : null;
            let riskLimits = _V.RISK;
            let risks = {};
            if (riskLimits != null) {
                risks = riskLimits["Limits"]
            }

            let reqRiskLimit = [];
            if (criteria.limitType == "*") {
                reqRiskLimit = filterByCategory(criteria.riskType)
            } else {
                reqRiskLimit = filterByCategoryAndName(criteria.riskType, criteria.limitType)

            }

            let reqArr = splitPointer(criteria.riskPointer);

            let responseOfLimit = { specials: {}, risks: {} };
            reqArr.forEach(element => {
                reqRiskLimit.forEach(item => {
                    if (specials != null) {
                        if (responseOfLimit?.["specials"]?.hasOwnProperty(element)) {
                            responseOfLimit["specials"][element][item] = specials[element + ":" + item];
                        } else {
                            responseOfLimit["specials"][element] = {}
                            responseOfLimit["specials"][element][item] = specials[element + ":" + item];
                        }
                    }
                    if (responseOfLimit["risks"].hasOwnProperty(element)) {
                        responseOfLimit["risks"][element][item] = risks[element + ":" + item];
                    } else {
                        responseOfLimit["risks"][element] = {}
                        responseOfLimit["risks"][element][item] = risks[element + ":" + item];
                    }
                });
            });

            const limitParam = JSON.parse(JSON.stringify(responseOfLimit));

            let resultOfRisks = getDeepestValues(reqRiskLimit, limitParam);

            return {
                riskId: riskId,
                risks: risks,
                specials: specials,
                reqRiskLimit: reqRiskLimit,
                resRiskLimit: responseOfLimit,
                results: resultOfRisks
            };
        }

        async function getLimitType(req) {
            return _V.SETTINGS.riskgroups
        }

        function filterByCategoryAndName(category, name) {
            const keys = Object.entries(_V.SETTINGS.riskgroups).reduce((acc, [key, value]) => {
                if (value.category.toLowerCase() === category.toLowerCase() && value.name.toLowerCase() === name.toLowerCase()) {
                    acc.push(key);
                }
                return acc;
            }, []);

            return keys;
        }

        function filterByCategory(category) {
            const keys = Object.entries(_V.SETTINGS.riskgroups).reduce((acc, [key, value]) => {
                if (value.category.toLowerCase() === category.toLowerCase()) {
                    acc.push(key);
                }
                return acc;
            }, []);

            return keys;
        }

        function splitPointer(pointer) {
            const results = [];
            const parts = pointer.split(':');

            for (let i = parts.length; i > 0; i--) {
                const subset = parts.slice(0, i).join(':');
                results.push(subset);
            }

            return results;
        }

        function getDeepestValues(reqRiskLimit, resRiskLimit) {
            let flattenedRisks = {};

            function flattenObject(obj, prefix = '', category = '') {
                Object.keys(obj).forEach(key => {
                    const fullPath = prefix ? `${prefix}:${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        flattenObject(obj[key], fullPath, category || key);
                    } else {
                        flattenedRisks[`${category}:${fullPath}`] = obj[key];
                    }
                });
            }

            Object.keys(resRiskLimit).forEach(category => {
                flattenObject(resRiskLimit[category], '', category);
            });

            const result = reqRiskLimit.reduce((acc, riskType) => {
                const relevantPaths = Object.keys(flattenedRisks).filter(path => path.includes(`:${riskType}`));
                relevantPaths.sort((a, b) => {
                    const depthA = a.split(':').length;
                    const depthB = b.split(':').length;
                    const isSpecialA = a.startsWith('specials:');
                    const isSpecialB = b.startsWith('specials:');
                    if (isSpecialA === isSpecialB) {
                        return depthB - depthA;
                    }
                    return isSpecialB ? 1 : -1;
                });

                if (relevantPaths.length) {
                    const deepestPath = relevantPaths[0];
                    acc[riskType] = flattenedRisks[deepestPath];
                } else {
                    acc[riskType] = _V.SETTINGS.riskgroups[riskType].value;
                }
                return acc;
            }, {});

            return result;
        }

        return checkIt(req);
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
        // return lang?.outComeMarkets?.[name] ? lang?.outComeMarkets?.[name] : name
    }

    ShowBalance(balance, curr = "CHF") {
        return FUNC.CurrencyFind(curr).sign + "" + formatter.format(balance)
    }

    outcomeRiskGroup(data) {
        const transformedData = [];
        data.forEach(match => {
            match.outComes.forEach(outcome => {
                var t = {
                    trId: USER.Risk({

                        "id": _V.USER._id,
                        "criteria": {
                            "riskType": "sport",
                            "riskPointer": match.competition.sportId + ":" + match.competition.catId + ":" + match.competition.trId,
                            "limitType": "*"

                        }
                    }).results,
                    catId: USER.Risk({

                        "id": _V.USER._id,
                        "criteria": {
                            "riskType": "sport",
                            "riskPointer": match.competition.sportId + ":" + match.competition.catId,
                            "limitType": "*"

                        }
                    }).results,
                    sportId: USER.Risk({
                        "id": _V.USER._id,
                        "criteria": {
                            "riskType": "sport",
                            "riskPointer": match.competition.sportId,
                            "limitType": "*"

                        }
                    }).results,
                    marketId: USER.Risk({
                        "id": _V.USER._id,
                        "criteria": {
                            "riskType": "sport",
                            "riskPointer": match.competition.sportId + ":" + match.competition.catId + ":" + match.competition.trId + ":M_" + outcome.marketId,
                            "limitType": "*"

                        }
                    }).results,
                };
                transformedData.push(t);
            });
        });

        return transformedData;
    }

    compareData(data, criteria = 'max') {
        const convertValue = (value) => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            if (!isNaN(value)) return parseFloat(value);
            return value;
        }
        const result = {};
        data.forEach(item => {
            Object.keys(item).forEach(category => {
                Object.entries(item[category]).forEach(([key, value]) => {
                    if (!result.hasOwnProperty(key)) {
                        result[key] = {
                            value: convertValue(value),
                            passed: [value]
                        };
                    } else {
                        result[key].passed.push(value);
                        const isSpecialCase = value === '-1';
                        const isNumeric = !isNaN(value) && !isSpecialCase;
                        const newValue = isNumeric ? parseFloat(value) : value;
                        const currentValue = isNumeric ? parseFloat(result[key].value) : convertValue(result[key].value);

                        let shouldUpdate = false;
                        if (isNumeric || (value === 'true' || value === 'false')) {
                            shouldUpdate = criteria === 'max' ? newValue > currentValue : newValue < currentValue;
                        }
                        if (shouldUpdate && !(criteria === 'min' && isSpecialCase && result[key].passed.some(v => v !== '-1'))) {
                            result[key].value = convertValue(value);
                        } else if (criteria === 'min' && isSpecialCase && result[key].passed.every(v => v === '-1')) {
                            result[key].value = convertValue(value);
                        }
                    }
                });
            });
        });
        for (let key in result) {
            result[key].passed = [...new Set(result[key].passed)];
            if (criteria === 'min' && result[key].passed.includes('-1') && result[key].passed.some(v => v !== '-1')) {
                result[key].value = convertValue(result[key].passed.filter(v => v !== '-1').reduce((a, b) => Math.min(a, b), convertValue(result[key].value)));
            }
        }
        return result;
    }

    homeMatches(list, sports) {
 

        const find1x2Odds = async (matchId) => {
            return _V.MATCHES[matchId].odds.filter(item =>
                item.marketId === 1
            );
        }
            // console.log(Object.keys(list))
        // _V.MATCHES = Object.keys(list).forEach(key => {
        //     list[key].markets = list[key].markets.filter(market => market.marketId === '1');
        // })

        _V.MATCHES = list;
        _V.SPORTS = sports;

        // return list;
        return Object.values(_V.MATCHES).filter(async match => {

            // if (match.markets.find(m => m.marketId == 1 && m.markets.length  >0 || m.info._is.totalMarkets ===0) || match.markets.find(m => m.marketId == 406) ) {
            if (match.markets.find(m => m?.marketId == 1) || match.markets.find(m => m?.marketId == 406) ) {

                // MARKETID 1 YOKSA LİSTEDEN ÇIKAR
                match.market1 = match.markets.find(m => m.marketId == 1);
                match.market406 = match.markets.find(m => m.marketId == 406);
                // match.market1 = match.markets.find(m => m.market1 != 'undefined');                

                // match.mains = Object.values(_V.MarketSettings[match.competition.sportId]['mainMarkets']).map(m => Object.keys(m)[0]);
                // return true; // Koşulu sağlayan maçları tut 

            }

                                      
            // SAAT VE TARİH AYARLA
            match.date = this.BookmakerTime(match.info.dates.scheduledTime);
            match.startTime = match.competition.startTime;

            // FORMA OLUŞTUR
            match.jerseys = [(this.jersey(match.competition?.competitors[0]?.jersey?.[0]?.base)), (this.jersey(match.competition?.competitors[1]?.jersey?.[0]?.base,"away"))];



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
        this.#socket = io.connect(socket_base, {
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
            }).on('CASHOUTS', async function (rs) {
                _V.Cashout = rs;
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
                        // app.dialog.alert("Odds changed we need second confirmation", "Opps");
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
const LANG = new LANGS();
const FUNC = new FUNCS();
const VAPP = new V_APP();
const USER = new USERS();
const BET = new BETS();

export { SESSION, BET, VAPP, USER, FUNC, CON, _V, Socket, LANG };

