interface ClassCreator<P, S> {
    (specification: React.Specification<P, S>): React.ReactComponentFactory<P>;
}

export = ClassCreator;
