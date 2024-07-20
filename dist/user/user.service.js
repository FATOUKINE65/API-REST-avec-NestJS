"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userService) {
        this.userService = userService;
    }
    async inscription(userData) {
        try {
            const user_exist = await this.userService.findOne({ where: { email: userData.email } });
            if (user_exist) {
                return { message: "L'email existe deja", success: false };
            }
            const motDePasse_a_hasher = await bcrypt.genSalt(10);
            const motDePsse_hasher = await bcrypt.hash(userData.password, motDePasse_a_hasher);
            userData.password = motDePsse_hasher;
            const nouveau_user = await this.userService.create(userData);
            console.log(userData);
            this.userService.save(nouveau_user);
            return { message: "Compte cree avec succee", success: true };
        }
        catch (error) {
            console.log(error);
            return { message: 'Erreur lors de la creation de compte', success: false };
        }
    }
    async connexion(userData) {
        try {
            const user_exist = await this.userService.findOne({ where: { email: userData.email } });
            if (!user_exist) {
                return { message: "L'email ou mot de passe est incorrect", success: false };
            }
            const verifier_motDePasse = await bcrypt.compare(userData.password, user_exist.password);
            if (!verifier_motDePasse) {
                return { message: "L'eamil ou mot de pasee est incorrect", success: false };
            }
            const token = jwt.sign({ id: user_exist.id }, process.env.CLE_SECRETE, {
                expiresIn: '2d'
            });
            return { message: "Connexion reussie", success: true, TOKEN: token };
        }
        catch (error) {
            console.log('Echec de la connexion');
            return { message: "Erreur lors de la connexion", success: false };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map