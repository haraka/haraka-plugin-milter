'use strict'

const net = require('net')
const EventEmitter = require('events');


const SMFI_V1_ACTS     = 0x0F;
const SMFI_V2_ACTS     = 0x1F;
const SMFI_CURR_ACTS   = 0x1F;

const SMFIA_UNKNOWN    = 'U';
const SMFIA_UNIX       = 'L';
const SMFIA_INET       = '4';
const SMFIA_INET6      = '6';

const SMFIC_ABORT      = 'A';
const SMFIC_BODY       = 'B';
const SMFIC_CONNECT    = 'C';
const SMFIC_MACRO      = 'D';
const SMFIC_BODYEOB    = 'E';
const SMFIC_HELO       = 'H';
const SMFIC_HEADER     = 'L';
const SMFIC_MAIL       = 'M';
const SMFIC_EOH        = 'N';
const SMFIC_OPTNEG     = 'O';
const SMFIC_QUIT       = 'Q';
const SMFIC_RCPT       = 'R';
const SMFIC_DATA       = 'T';
const SMFIC_UNKNOWN    = 'U';

const SMFIR_ADDRCPT    = '+';
const SMFIR_DELRCPT    = '-';
const SMFIR_ACCEPT     = 'a';
const SMFIR_REPLBODY   = 'b';
const SMFIR_CONTINUE   = 'c';
const SMFIR_DISCARD    = 'd';
const SMFIR_ADDHEADER  = 'h';
const SMFIR_INSHEADER  = 'i'; // v3, or v2 and Sendmail 8.13+
const SMFIR_CHGHEADER  = 'm';
const SMFIR_PROGRESS   = 'p';
const SMFIR_QUARANTINE = 'q';
const SMFIR_REJECT     = 'r';
const SMFIR_SETSENDER  = 's';
const SMFIR_TEMPFAIL   = 't';
const SMFIR_REPLYCODE  = 'y';

const SMFIF_ADDHDRS    = 0x01;
const SMFIF_CHGBODY    = 0x02;
const SMFIF_ADDRCPT    = 0x04;
const SMFIF_DELRCPT    = 0x08;
const SMFIF_CHGHDRS    = 0x10;
const SMFIF_QUARANTINE = 0x20;
const SMFIF_SETSENDER  = 0x40;

const SMFIP_NOCONNECT  = 0x01;
const SMFIP_NOHELO     = 0x02;
const SMFIP_NOMAIL     = 0x04;
const SMFIP_NORCPT     = 0x08;
const SMFIP_NOBODY     = 0x10;
const SMFIP_NOHDRS     = 0x20;
const SMFIP_NOEOH      = 0x40;
const SMFIP_NONE       = 0x7F;


let lists
let milters

exports.register = function () {
    const plugin = this
    plugin.load_milter_ini()

    plugin.register_hook('connect_init',          'createConnection',       -100);
    plugin.register_hook('connect',               'onConnection',           -100);
    plugin.register_hook('unrecognized_command',  'onUnrecognizedCommand',  -100);
    plugin.register_hook('disconnect',            'onDisconnect',           -100);
    plugin.register_hook('helo',                  'onHelo',                 -100);
    plugin.register_hook('ehlo',                  'onHelo',                 -100);
    plugin.register_hook('mail',                  'onMail',                 -100);
    plugin.register_hook('rcpt',                  'onRcpt',                 -100);
    plugin.register_hook('rcpt_ok',               'onRcptOk',               -100);
    plugin.register_hook('data',                  'onData',                 -100);
    plugin.register_hook('data_post',             'onDataPost',             -100);
}

exports.onDataPost = function (next, connection) {
}

exports.onData = function (next, connection) {
}

exports.onRcptOk = function (next, connection, recipient) {
}

exports.onRcpt = function (next, connection, params) {
}

exports.onMail = function (next, connection, params) {
}

exports.onHelo = function (next, connection, helo) {
}

exports.onDisconnect = function (next, connection) {
}

exports.onUnrecognizedCommand = function (next, connection, params) {
}

exports.onConnection = function (next, connection) {
}

exports.createConnection = function (next, connection) {
    let client

    connection.notes.milters = {};

    for (let j = 0; j < milters.length; j++) {
        const milter = milters[j]
        const conOptions = {}

        client = new net.Socket()
        if (milter.socket != undefined) {
            conOptions.path = milter.socket
        } else if (milter.host != undefined && milter.port != undefined) {
            const parsed = parseInt(milter.port, 10)
            if (isNaN(parsed)) {
                this.logerror('aborting: invalide milter configuration - port is not a number')
                return
            } else {
                conOptions.port = parsed
            }
            conOptions.host = milter.host
        } else {
            this.logerror('aborting: invalide milter configuration')
            return
        }

        client.connect(conOptions, function () {
            console.log('Connected')
            client.write('Hello, server! Love, Client.')
        })

        client.on('data', function (data) {
            console.log('Received: ' + data)
            client.destroy() // kill client after server's response
        })

        client.on('close', function () {
            console.log('Connection closed')
        })

        connection.notes.clients.push(client)
    }
}

exports.load_milter_ini = function () {
    const plugin = this

    lists = plugin.config.get('milter.ini')
    milters = Object.keys(lists)
    if (!milters || milters.length <= 1) {
        this.logerror('aborting: no milters configured')
        return
    }
}
