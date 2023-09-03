// noinspection JSUnusedGlobalSymbols

import { IQuizCollection } from "../interfaces/models/quiz";
import {
    IStyleQuiz,
    IStyleQuizResult,
    IStyleQuizResultPaired,
    IStyleQuizResultSingledRecord,
    IStyleQuizResultSingle,
    IStyleQuizResultPairedRecord,
    IStyleQuizResultFinalRecord,
} from "../interfaces/result-quiz.interfaces";
import { StyleCategory } from "../enums/style-category.enum";
import { IQuizAnswer } from "../interfaces/quiz.interfaces";
import { toFirstCase } from "hichchi-utils";

export class StyleQuizResult {
    public readonly collection?: IQuizCollection<IStyleQuiz>;

    readonly #result?: IStyleQuizResult;

    readonly #singled: Partial<IStyleQuizResultSingle>;

    readonly #paired: Partial<IStyleQuizResultPaired>;

    readonly #total: number;

    readonly #final?: IStyleQuizResultFinalRecord;

    get result(): IStyleQuizResult {
        return {
            singled: (this.#singled as IStyleQuizResultSingle) ?? {
                activist: { count: 0, percentage: 0 },
                reflector: { count: 0, percentage: 0 },
                sensing: { count: 0, percentage: 0 },
                intuitive: { count: 0, percentage: 0 },
                visual: { count: 0, percentage: 0 },
                verbal: { count: 0, percentage: 0 },
                sequential: { count: 0, percentage: 0 },
                global: { count: 0, percentage: 0 },
            },
            paired: (this.#paired as IStyleQuizResultPaired) ?? {
                activistReflector: { count: 0, percentage: 0 },
                sensingIntuitive: { count: 0, percentage: 0 },
                visualVerbal: { count: 0, percentage: 0 },
                sequentialGlobal: { count: 0, percentage: 0 },
            },
            total: this.#total,
        };
    }

    get total(): number {
        return this.#total;
    }

    get singled(): IStyleQuizResultSingle {
        return this.result.singled;
    }

    get singles(): IStyleQuizResultSingledRecord[] {
        return Object.values(this.result.singled);
    }

    get paired(): IStyleQuizResultPaired {
        return this.result.paired;
    }

    get pairs(): IStyleQuizResultSingledRecord[][] {
        return [
            [this.result.singled.activist, this.result.singled.reflector],
            [this.result.singled.sensing, this.result.singled.intuitive],
            [this.result.singled.visual, this.result.singled.verbal],
            [this.result.singled.sequential, this.result.singled.global],
        ];
    }

    get final(): IStyleQuizResultFinalRecord {
        return this.#final!;
    }

    constructor(result: IStyleQuizResult);

    constructor(collection: IQuizCollection<IStyleQuiz>, answers?: IQuizAnswer[]);

    constructor(resultOrCollection: IStyleQuizResult | IQuizCollection<IStyleQuiz>, answers?: IQuizAnswer[]) {
        if ((resultOrCollection as IStyleQuizResult).singled) {
            this.#result = resultOrCollection as IStyleQuizResult;
            this.collection = undefined;
        } else if ((resultOrCollection as IQuizCollection<IStyleQuiz>).quizzes) {
            this.#result = undefined;
            this.collection = resultOrCollection as IQuizCollection<IStyleQuiz>;
            this.collection.userAnswers = answers ?? [];
        } else {
            throw new Error("Either collection or result must be provided");
        }

        this.#total = (this.collection ? this.collection.quizzes.length : this.#result?.total) ?? 0;

        this.#singled = {
            activist: this.collection ? this.generateSingle(StyleCategory.ACTIVIST) : this.#result?.singled.activist,
            reflector: this.collection ? this.generateSingle(StyleCategory.REFLECTOR) : this.#result?.singled.reflector,
            sensing: this.collection ? this.generateSingle(StyleCategory.SENSING) : this.#result?.singled.sensing,
            intuitive: this.collection ? this.generateSingle(StyleCategory.INTUITIVE) : this.#result?.singled.intuitive,
            visual: this.collection ? this.generateSingle(StyleCategory.VISUAL) : this.#result?.singled.visual,
            verbal: this.collection ? this.generateSingle(StyleCategory.VERBAL) : this.#result?.singled.verbal,
            sequential: this.collection
                ? this.generateSingle(StyleCategory.SEQUENTIAL)
                : this.#result?.singled.sequential,
            global: this.collection ? this.generateSingle(StyleCategory.GLOBAL) : this.#result?.singled.global,
        };

        this.#paired = {
            activistReflector: this.generatePair(this.#singled.activist, this.#singled.reflector),
            sensingIntuitive: this.generatePair(this.#singled.sensing, this.#singled.intuitive),
            visualVerbal: this.generatePair(this.#singled.visual, this.#singled.verbal),
            sequentialGlobal: this.generatePair(this.#singled.sequential, this.#singled.global),
        };

        const finalCategory = this.pairs.sort((a, b) => b[0].count - a[0].count)[0][0].category;
        if (finalCategory) {
            this.#final = {
                category: finalCategory,
                label: toFirstCase(finalCategory),
                count: this.singles.find(s => s.category === finalCategory)?.count ?? 0,
                percentage: this.singles.find(s => s.category === finalCategory)?.percentage ?? 0,
            };
        }
    }

    private generateSingle(category: StyleCategory): IStyleQuizResultSingledRecord {
        const count = this.collection?.quizzes
            ?.filter(q => q.choiceCategories?.includes(category))
            ?.filter(
                q =>
                    q?.choices?.find(
                        c => c.id === this.collection?.userAnswers?.find(a => a.id === q.id)?.answer?.[0]?.id,
                    )?.category === category,
            ).length;
        if (!count) {
            return {
                category,
                label: `${toFirstCase(category)}`,
                count: 0,
                percentage: 0,
            };
        }
        return {
            category,
            label: `${toFirstCase(category)}`,
            count: count ?? 0,
            percentage: Math.round((count / this.collection!.quizzes.length) * 100),
        };
    }

    private generatePair(
        one?: IStyleQuizResultPairedRecord,
        two?: IStyleQuizResultPairedRecord,
    ): IStyleQuizResultPairedRecord {
        if (!one || !two) {
            return {
                count: 0,
                percentage: 0,
            };
        }
        return {
            difference:
                [one.count, two.count].sort((a, b) => b - a)[0] - [one.count, two.count].sort((a, b) => b - a)[1],
            selectedCategory: one.count > two.count ? one.category : two.category,
            label: `${one.label} / ${two.label}`,
            count: one.count + two.count,
            percentage: one.percentage + two.percentage,
        };
    }
}
